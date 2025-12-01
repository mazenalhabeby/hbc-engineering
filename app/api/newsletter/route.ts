import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Target email for receiving newsletter subscriptions
const NEWSLETTER_EMAIL = process.env.NEWSLETTER_RECIPIENT_EMAIL || "office@hbc-engineering.com";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract email
    const email = formData.get("email") as string;

    // Honeypot check (bot prevention)
    const website = formData.get("website") as string;
    if (website) {
      // If honeypot field is filled, it's likely a bot
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Configure SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Build notification email HTML content for the office
    const notificationHtml = `
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
    .email-display { background: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #10b981; font-size: 16px; font-weight: 500; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Newsletter Subscription</h1>
      <p style="margin: 8px 0 0 0; opacity: 0.9;">From HBC Group Website</p>
    </div>

    <div class="content">
      <div class="section">
        <h2>Subscriber Email</h2>
        <div class="email-display">
          <a href="mailto:${email}" style="color: #1f2937; text-decoration: none;">${email}</a>
        </div>
      </div>

      <div class="section">
        <h2>Next Steps</h2>
        <p>Add this email address to your newsletter distribution list or CRM system.</p>
      </div>
    </div>

    <div class="footer">
      <p>This subscription was submitted through the HBC Group website footer.</p>
      <p style="margin: 4px 0 0 0; color: #9ca3af; font-size: 12px;">Subscription Time: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    const notificationText = `
New Newsletter Subscription

SUBSCRIBER EMAIL
${email}

NEXT STEPS
Add this email address to your newsletter distribution list or CRM system.

---
Subscription Time: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
    `.trim();

    // Build confirmation email for the subscriber
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
      <h1>Welcome to Our Newsletter!</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Thank you for subscribing</p>
    </div>

    <div class="content">
      <div class="card">
        <h2>Subscription Confirmed</h2>
        <p>You've successfully subscribed to HBC Group's newsletter. We're excited to keep you updated with our latest news, insights, and innovations in engineering.</p>
      </div>

      <div class="highlight-box">
        <strong>What to Expect:</strong><br>
        You'll receive periodic updates about our projects, industry insights, company news, and exclusive content delivered straight to your inbox.
      </div>

      <div class="card">
        <h2>Stay Connected</h2>
        <p>In the meantime, feel free to explore our website or reach out to us if you have any questions.</p>
        <p style="margin-top: 10px;">
          <strong>Email:</strong> <a href="mailto:office@hbc-engineering.com" style="color: #10b981;">office@hbc-engineering.com</a>
        </p>
      </div>
    </div>

    <div class="footer">
      <p><strong>HBC Group</strong></p>
      <p>Engineering Excellence Since 1994</p>
      <p style="margin-top: 15px; font-size: 12px; color: #9ca3af;">
        You're receiving this email because you subscribed to our newsletter at hbc-engineering.com
      </p>
    </div>
  </div>
</body>
</html>
    `.trim();

    const confirmationText = `
NEWSLETTER SUBSCRIPTION CONFIRMED - HBC GROUP

Welcome!

You've successfully subscribed to HBC Group's newsletter. We're excited to keep you updated with our latest news, insights, and innovations in engineering.

WHAT TO EXPECT
You'll receive periodic updates about our projects, industry insights, company news, and exclusive content delivered straight to your inbox.

STAY CONNECTED
Email: office@hbc-engineering.com

---
HBC Group - Engineering Excellence Since 2016
You're receiving this email because you subscribed to our newsletter at hbc-engineering.com
    `.trim();

    // Send notification email to office
    const notificationEmailResult = await transporter.sendMail({
      from: process.env.SMTP_FROM_CONTACT || `"HBC Group" <${process.env.SMTP_USER}>`,
      to: NEWSLETTER_EMAIL,
      replyTo: email,
      subject: `New Newsletter Subscription: ${email}`,
      text: notificationText,
      html: notificationHtml,
    });

    console.log("Newsletter notification sent successfully:", notificationEmailResult.messageId);

    // Send confirmation email to subscriber
    const confirmationEmailResult = await transporter.sendMail({
      from: process.env.SMTP_FROM_CONTACT || `"HBC Group" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Welcome to HBC Group Newsletter`,
      text: confirmationText,
      html: confirmationHtml,
    });

    console.log("Subscriber confirmation email sent successfully:", confirmationEmailResult.messageId);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing to our newsletter!",
        notificationEmailId: notificationEmailResult.messageId,
        confirmationEmailId: confirmationEmailResult.messageId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Newsletter subscription error:", error);
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
