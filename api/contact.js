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
      subject: "New Contact Form Message",
      text: req.body.note,
      email: req.body.email,
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
