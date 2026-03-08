import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";

const OFFICIAL_EMAIL = "tejnavi.studio@gmail.com";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
        : undefined,
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, service, message } = body || {};

        if (!email || !message) {
            return NextResponse.json(
                { message: "Email and message are required." },
                { status: 400 }
            );
        }

        // Save to database
        try {
            await db.insert(contactSubmissions).values({
                name: name || null,
                email,
                service: service || null,
                message,
            });
        } catch (dbError) {
            // Don't fail the request if DB save fails — still try to send email
            console.error("Failed to save contact to DB:", dbError);
        }

        // Send email notification
        const subject = `New inquiry (${service || "general"}) from ${name || "Website visitor"}`;
        const textLines = [
            `Name: ${name || "N/A"}`,
            `Email: ${email}`,
            `Service: ${service || "N/A"}`,
            "",
            message,
        ];

        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.warn("SMTP not configured; skipping email.");
            return NextResponse.json({
                message: "Contact received (email not sent – SMTP not configured).",
            });
        }

        await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: OFFICIAL_EMAIL,
            replyTo: email,
            subject,
            text: textLines.join("\n"),
        });

        return NextResponse.json({ message: "Message sent successfully." });
    } catch (err) {
        console.error("Error sending contact email", err);
        return NextResponse.json(
            { message: "Failed to send message." },
            { status: 500 }
        );
    }
}
