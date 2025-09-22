import nodemailer from 'nodemailer';

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Email configuration
const createTransporter = () => {
  // For development/testing, you can use Ethereal Email (fake SMTP)
  // For production, replace with your actual SMTP settings
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'ethereal.user@ethereal.email',
      pass: process.env.SMTP_PASS || 'ethereal.pass'
    }
  });
};

// Validation function
const validateFormData = (data) => {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }
  
  if (!data.surname || data.surname.trim().length < 2) {
    errors.push('Surname is required and must be at least 2 characters');
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email is required');
  }
  
  if (!data.note || data.note.trim().length < 10) {
    errors.push('Message is required and must be at least 10 characters');
  }
  
  return errors;
};

// Sanitize input to prevent injection
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>]/g, '').trim();
};

// Rate limiting (simple in-memory store)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per window

const checkRateLimit = (ip) => {
  const now = Date.now();
  const userRequests = rateLimitStore.get(ip) || [];
  
  // Remove old requests outside the window
  const validRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }
  
  // Add current request
  validRequests.push(now);
  rateLimitStore.set(ip, validRequests);
  
  return true; // Request allowed
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' });
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }
  
  try {
    // Get client IP for rate limiting
    const clientIP = req.headers['x-forwarded-for'] || 
                    req.connection.remoteAddress || 
                    req.socket.remoteAddress || 
                    'unknown';
    
    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.'
      });
    }
    
    // Parse and sanitize form data
    const formData = {
      name: sanitizeInput(req.body.name),
      surname: sanitizeInput(req.body.surname),
      email: sanitizeInput(req.body.email),
      mobile: sanitizeInput(req.body.mobile || ''),
      inquiryType: sanitizeInput(req.body.inquiryType || 'general'),
      note: sanitizeInput(req.body.note),
      honeypot: req.body.honeypot || '' // Honeypot field for spam detection
    };
    
    // Check honeypot (if filled, it's likely spam)
    if (formData.honeypot) {
      return res.status(400).json({
        success: false,
        message: 'Spam detected'
      });
    }
    
    // Validate form data
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    // Create email transporter
    const transporter = createTransporter();
    
    // Prepare email content
    const inquiryTypeMap = {
      speaking: 'Speaking Request',
      partnership: 'Partnership',
      media: 'Media Request',
      general: 'General Inquiry'
    };
    
    const inquiryTypeText = inquiryTypeMap[formData.inquiryType] || 'General Inquiry';
    
    const emailSubject = `New message from ${formData.name} ${formData.surname} — ${inquiryTypeText}`;
    
    const emailBody = `
New contact form submission from koendarras.com

Name: ${formData.name} ${formData.surname}
Email: ${formData.email}
Mobile: ${formData.mobile || 'Not provided'}
Inquiry Type: ${inquiryTypeText}

Message:
${formData.note}

---
Technical Details:
User Agent: ${req.headers['user-agent'] || 'Unknown'}
IP Address: ${clientIP}
Timestamp: ${new Date().toISOString()}
Page URL: ${req.headers.referer || 'Unknown'}
    `.trim();
    
    // Email options
    const mailOptions = {
      from: `"Website Contact Form" <no-reply@koendarras.com>`,
      to: 'info@koendarras.com',
      replyTo: formData.email,
      subject: emailSubject,
      text: emailBody,
      html: emailBody.replace(/\n/g, '<br>')
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.',
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Return error response (don't expose internal details)
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later or contact us directly.'
    });
  }
}

// Set CORS headers for all responses
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
