// api/contact.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact Form" <no-reply@koendarras.com>`,
      to: "info@koendarras.com",
      replyTo: req.body.email, // So you can reply directly from Gmail
      subject: `New message from ${req.body.name || "koendarras.com"}`,
      text: `
You have received a new message from the koendarras.com contact form.

From: ${req.body.name || "Anonymous"} <${req.body.email}>
Message:
${req.body.note}
  `,
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px;">
      <h2 style="color: #0b5394;">New Contact Form Message</h2>
      <p><strong>From:</strong> ${
        req.body.name || "Anonymous"
      } (<a href="mailto:${req.body.email}">${req.body.email}</a>)</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f9f9f9; border-left: 4px solid #0b5394; padding: 10px 15px; white-space: pre-wrap;">
        ${req.body.note}
      </div>
      <p style="margin-top: 20px; font-size: 13px; color: #777;">This message was sent from the koendarras.com contact form.</p>
    </div>
  `,
    });

    return res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("❌ Error sending mail:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send email" });
  }
}
