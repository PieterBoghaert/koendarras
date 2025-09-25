import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const createTransporter = () => {
  console.log(
    process.env.SMTP_HOST,
    process.env.SMTP_PORT,
    process.env.SMTP_USER
  );
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "",
    port: process.env.SMTP_PORT || "",
    secure: true,
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
  });
};

router.post("/", async (req, res) => {
  console.log("📩 Incoming request body:", req.body); // debug line
  try {
    const { name, email, note } = req.body;

    if (!name || !email || !note) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `"Website Contact Form" <no-reply@koendarras.com>`,
      to: "info@koendarras.com",
      subject: `New message from ${name}`,
      text: note,
      email: email,
    });

    console.log("✅ Email sent:", info.messageId);
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("❌ Error sending mail:", err);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

export default router;
