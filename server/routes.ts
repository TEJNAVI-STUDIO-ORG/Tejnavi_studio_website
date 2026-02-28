import type { Express } from "express";
import { createServer, type Server } from "http";
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

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    const { name, email, service, message } = req.body || {};

    if (!email || !message) {
      return res.status(400).json({ message: "Email and message are required." });
    }

    const subject = `New inquiry (${service || "general"}) from ${name || "Website visitor"}`;
    const textLines = [
      `Name: ${name || "N/A"}`,
      `Email: ${email}`,
      `Service: ${service || "N/A"}`,
      "",
      message,
    ];

    try {
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn("SMTP environment variables are not fully configured; skipping email send.");
        return res.status(200).json({ message: "Contact received (email not sent – SMTP not configured)." });
      }

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: OFFICIAL_EMAIL,
        replyTo: email,
        subject,
        text: textLines.join("\n"),
      });

      return res.status(200).json({ message: "Message sent successfully." });
    } catch (err) {
      console.error("Error sending contact email", err);
      return res.status(500).json({ message: "Failed to send message." });
    }
  });

  return httpServer;
}
