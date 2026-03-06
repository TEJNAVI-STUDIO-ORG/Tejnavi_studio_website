import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

        const subject = `New inquiry (${service || "general"}) from ${name || "Website visitor"}`;
        const textLines = [
            `Name: ${name || "N/A"}`,
            `Email: ${email}`,
            `Service: ${service || "N/A"}`,
            "",
            message,
        ];

        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.warn("SMTP environment variables are not fully configured; skipping email send.");
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
