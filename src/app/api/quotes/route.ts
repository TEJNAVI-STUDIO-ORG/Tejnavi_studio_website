import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/lib/db";
import { quoteRequests } from "@/lib/db/schema";

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
        const {
            name, email, phone, company,
            projectType, budget, timeline,
            description, currency,
            estimateMin, estimateMax,
            features
        } = body || {};

        if (!email || !name) {
            return NextResponse.json({ message: "Name and email are required." }, { status: 400 });
        }

        // Save to database
        try {
            await db.insert(quoteRequests).values({
                name,
                email,
                company: company || null,
                phone: phone || null,
                projectType: projectType || null,
                budget: budget || null,
                timeline: timeline || null,
                description: description || "",
                status: "new",
            });
        } catch (dbError) {
            console.error("Failed to save quote to DB:", dbError);
        }

        const currencySymbol = currency === "INR" ? "₹" : "$";
        const featureList = Array.isArray(features) ? features.join(", ") : (features || "None");

        // Send admin notification email
        if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
            try {
                const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #0f0f0f; color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background: #1a1a1a; border: 1px solid #333; }
    .header { background: #ffffff; padding: 32px; text-align: center; }
    .header h1 { color: #0f0f0f; font-size: 24px; margin: 0; letter-spacing: -0.5px; }
    .header h1 span { font-style: italic; color: #555; }
    .badge { display: inline-block; background: #0f0f0f; color: #fff; padding: 4px 14px; border-radius: 999px; font-size: 11px; margin-top: 10px; letter-spacing: 2px; text-transform: uppercase; }
    .body { padding: 32px; }
    .section { margin-bottom: 24px; border-bottom: 1px solid #333; padding-bottom: 24px; }
    .section:last-child { border-bottom: none; }
    .label { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #888; margin-bottom: 6px; }
    .value { font-size: 15px; color: #f5f5f5; font-weight: 500; }
    .estimate-box { background: #0f0f0f; border: 1px solid #444; padding: 20px; text-align: center; border-radius: 4px; }
    .estimate-box .amount { font-size: 28px; font-weight: 700; color: #ffffff; }
    .estimate-box .sub { font-size: 11px; color: #888; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }
    .tag { display: inline-block; background: #2a2a2a; color: #c0c0c0; padding: 3px 10px; border-radius: 3px; font-size: 11px; margin: 2px; }
    .footer { padding: 20px 32px; background: #111; text-align: center; font-size: 11px; color: #666; border-top: 1px solid #222; }
    .cta { display: inline-block; background: #fff; color: #000; padding: 12px 28px; font-weight: 700; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>TEJNAVI<span>.</span></h1>
      <div class="badge">New Quote Request</div>
    </div>
    <div class="body">
      <div class="section">
        <div style="display:flex;gap:32px;flex-wrap:wrap;">
          <div>
            <div class="label">Client Name</div>
            <div class="value">${name}</div>
          </div>
          <div>
            <div class="label">Email</div>
            <div class="value">${email}</div>
          </div>
          ${phone ? `<div><div class="label">Phone</div><div class="value">${phone}</div></div>` : ""}
          ${company ? `<div><div class="label">Company</div><div class="value">${company}</div></div>` : ""}
        </div>
      </div>

      <div class="section">
        <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:center;">
          <div>
            <div class="label">Project Type</div>
            <div class="value">${projectType || "Not specified"}</div>
          </div>
          <div>
            <div class="label">Scope / Tier</div>
            <div class="value">${budget || "Not specified"}</div>
          </div>
          <div>
            <div class="label">Timeline</div>
            <div class="value">${timeline || "Not specified"}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="label">Selected Features</div>
        <div style="margin-top:8px;">${featureList.split(", ").map((f: string) => `<span class="tag">${f}</span>`).join("")}</div>
      </div>

      <div class="section">
        <div class="label">Estimate (${currency || "USD"})</div>
        <div class="estimate-box">
          <div class="amount">${currencySymbol}${Number(estimateMin).toLocaleString()} – ${currencySymbol}${Number(estimateMax).toLocaleString()}</div>
          <div class="sub">Auto-calculated estimate</div>
        </div>
      </div>

      ${description ? `
      <div class="section">
        <div class="label">Project Insights</div>
        <div class="value" style="white-space:pre-wrap;color:#c0c0c0;">${description}</div>
      </div>
      ` : ""}

      <div style="text-align:center;margin-top:8px;">
        <a href="https://tejnavistudio.vercel.app/admin/quotes" class="cta">View in Admin Panel</a>
      </div>
    </div>
    <div class="footer">
      Tejnavi Studio · Received ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
    </div>
  </div>
</body>
</html>`;

                await transporter.sendMail({
                    from: `"Tejnavi Studio" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
                    to: OFFICIAL_EMAIL,
                    replyTo: email,
                    subject: `🚀 New Quote Request — ${projectType || "Project"} from ${name}`,
                    html: adminHtml,
                });

                // Auto-reply to client
                const clientHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #0f0f0f; color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 0 auto; background: #1a1a1a; border: 1px solid #333; }
    .header { background: #ffffff; padding: 32px; text-align: center; }
    .header h1 { color: #0f0f0f; font-size: 24px; margin: 0; }
    .header h1 span { font-style: italic; color: #555; }
    .body { padding: 36px; }
    .body p { color: #c0c0c0; line-height: 1.8; font-size: 14px; }
    .highlight { color: #ffffff; font-weight: 600; }
    .estimate-box { background: #0f0f0f; border: 1px solid #444; padding: 20px; text-align: center; border-radius: 4px; margin: 28px 0; }
    .estimate-box .amount { font-size: 26px; font-weight: 700; color: #ffffff; }
    .estimate-box .sub { font-size: 11px; color: #888; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }
    .footer { padding: 20px 32px; background: #111; text-align: center; font-size: 11px; color: #666; border-top: 1px solid #222; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>TEJNAVI<span>.</span></h1>
    </div>
    <div class="body">
      <p>Hi <span class="highlight">${name}</span>,</p>
      <p>Thank you for reaching out to Tejnavi Studio! We've received your project request and our team will review it shortly.</p>
      
      <div class="estimate-box">
        <div class="amount">${currencySymbol}${Number(estimateMin).toLocaleString()} – ${currencySymbol}${Number(estimateMax).toLocaleString()}</div>
        <div class="sub">Your estimated range (${currency || "USD"})</div>
      </div>

      <p>We typically respond within <span class="highlight">24–48 hours</span> with a detailed proposal tailored to your project. In the meantime, feel free to explore our work at <a href="https://tejnavistudio.vercel.app/projects" style="color:#c0c0c0;">tejnavistudio.vercel.app</a>.</p>
      <p>Talk soon,<br><span class="highlight">The Tejnavi Team</span></p>
    </div>
    <div class="footer">Tejnavi Studio · tejnavi.studio@gmail.com</div>
  </div>
</body>
</html>`;

                await transporter.sendMail({
                    from: `"Tejnavi Studio" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
                    to: email,
                    subject: `We received your project request! ✅`,
                    html: clientHtml,
                });
            } catch (emailErr) {
                console.error("Failed to send email:", emailErr);
                // Don't fail the request if email fails
            }
        } else {
            console.warn("SMTP not configured; skipping email.");
        }

        return NextResponse.json({ message: "Quote submitted successfully." });
    } catch (err) {
        console.error("Error processing quote:", err);
        return NextResponse.json({ message: "Failed to submit quote." }, { status: 500 });
    }
}
