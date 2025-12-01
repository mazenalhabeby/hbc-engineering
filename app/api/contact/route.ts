import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Target email for receiving contact form submissions
const CONTACT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || "office@hbc-engineering.com";
const OFFICE_EMAIL = process.env.OFFICE_EMAIL || "office@hbc-engineering.com";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract all form fields
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const service = formData.get("service") as string;
    const message = formData.get("message") as string;
    const consent = formData.get("consent") as string;

    // Honeypot check (bot prevention)
    const website = formData.get("website") as string;
    if (website) {
      // If honeypot field is filled, it's likely a bot
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing required fields: name and email" },
        { status: 400 }
      );
    }

    // Validate consent checkbox
    if (consent !== "on") {
      return NextResponse.json(
        { error: "You must agree to be contacted" },
        { status: 400 }
      );
    }

    // Configure SMTP transporter with MXroute
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Build email HTML content
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0f172a 0%, #334155 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; border: 1px solid #e5e7eb; }
    .section h2 { margin-top: 0; color: #1f2937; font-size: 18px; border-bottom: 2px solid #0f172a; padding-bottom: 8px; }
    .field { margin-bottom: 12px; }
    .label { font-weight: 600; color: #4b5563; display: inline-block; min-width: 140px; }
    .value { color: #1f2937; }
    .message-box { background: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #0f172a; margin-top: 10px; white-space: pre-wrap; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
    .service-badge { background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 12px; display: inline-block; font-size: 14px; font-weight: 500; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
      <p style="margin: 8px 0 0 0; opacity: 0.9;">From HBC Group Website</p>
    </div>

    <div class="content">
      <!-- Contact Information -->
      <div class="section">
        <h2>Contact Information</h2>
        <div class="field">
          <span class="label">Name:</span>
          <span class="value">${name}</span>
        </div>
        ${company ? `
        <div class="field">
          <span class="label">Company:</span>
          <span class="value">${company}</span>
        </div>
        ` : ''}
        <div class="field">
          <span class="label">Email:</span>
          <span class="value"><a href="mailto:${email}">${email}</a></span>
        </div>
        ${phone ? `
        <div class="field">
          <span class="label">Phone:</span>
          <span class="value"><a href="tel:${phone}">${phone}</a></span>
        </div>
        ` : ''}
      </div>

      <!-- Service Interest -->
      ${service ? `
      <div class="section">
        <h2>Service Interest</h2>
        <span class="service-badge">${service}</span>
      </div>
      ` : ''}

      <!-- Message -->
      ${message ? `
      <div class="section">
        <h2>Message</h2>
        <div class="message-box">${message}</div>
      </div>
      ` : ''}
    </div>

    <div class="footer">
      <p>This inquiry was submitted through the HBC Group contact form.</p>
      <p style="margin: 4px 0 0 0; color: #9ca3af; font-size: 12px;">Submission Time: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    // Plain text version
    const textContent = `
New Contact Form Submission

CONTACT INFORMATION
Name: ${name}
${company ? `Company: ${company}` : ''}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

${service ? `SERVICE INTEREST\n${service}\n` : ''}

${message ? `MESSAGE\n${message}\n` : ''}

---
Submission Time: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
    `.trim();

    // Build confirmation email for the sender
    const confirmationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .checkmark { font-size: 48px; margin-bottom: 10px; }
    .content { background: #f9fafb; padding: 30px; }
    .card { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; border: 1px solid #e5e7eb; }
    .card h2 { margin-top: 0; color: #1f2937; font-size: 18px; border-bottom: 2px solid #10b981; padding-bottom: 8px; }
    .highlight-box { background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; border-radius: 4px; margin: 15px 0; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="checkmark">✓</div>
      <h1>Message Received!</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Thank you for contacting HBC Group</p>
    </div>

    <div class="content">
      <div class="card">
        <h2>Hello ${name}!</h2>
        <p>We've successfully received your inquiry and our team will review it shortly. We aim to respond to all inquiries within 24 business hours.</p>
      </div>

      <div class="highlight-box">
        <strong>What's Next?</strong><br>
        Our team will review your message and get back to you via email at <strong>${email}</strong>${phone ? ` or call you at <strong>${phone}</strong>` : ''}.
      </div>

      <div class="card">
        <h2>Need Immediate Assistance?</h2>
        <p>If your inquiry is urgent, feel free to contact us directly:</p>
        <p style="margin-top: 10px;">
          <strong>Email:</strong> <a href="mailto:${OFFICE_EMAIL}" style="color: #10b981;">${OFFICE_EMAIL}</a>
        </p>
      </div>
    </div>

    <div class="footer">
      <p><strong>HBC Group</strong></p>
      <p>Engineering Excellence Since 1994</p>
      <p style="margin-top: 15px; font-size: 12px; color: #9ca3af;">
        This is an automated confirmation email. Please do not reply directly to this message.
      </p>
    </div>
  </div>
</body>
</html>
    `.trim();

    const confirmationText = `
MESSAGE RECEIVED - HBC GROUP

Hello ${name},

Thank you for contacting HBC Group!

We've successfully received your inquiry and our team will review it shortly. We aim to respond to all inquiries within 24 business hours.

WHAT'S NEXT?
Our team will review your message and get back to you via email at ${email}${phone ? ` or call you at ${phone}` : ''}.

NEED IMMEDIATE ASSISTANCE?
Email: ${OFFICE_EMAIL}

---
HBC Group - Engineering Excellence Since 1994
This is an automated confirmation email.
    `.trim();

    // Send email to office (main notification)
    const officeEmail = await transporter.sendMail({
      from: process.env.SMTP_FROM_CONTACT || `"HBC Group" <${process.env.SMTP_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New Contact Form: ${service || "General Inquiry"} - ${name}`,
      text: textContent,
      html: htmlContent,
    });

    console.log("Office email sent successfully:", officeEmail.messageId);

    // Send confirmation email to sender
    const senderEmail = await transporter.sendMail({
      from: process.env.SMTP_FROM_CONTACT || `"HBC Group" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `We received your message - HBC Group`,
      text: confirmationText,
      html: confirmationHtml,
    });

    console.log("Sender confirmation email sent successfully:", senderEmail.messageId);

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        officeEmailId: officeEmail.messageId,
        senderEmailId: senderEmail.messageId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact form submission error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error details:", errorMessage);

    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again later.",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
