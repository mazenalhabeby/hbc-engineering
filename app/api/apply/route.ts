import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Target email for receiving applications
const RECIPIENT_EMAIL = process.env.APPLICATION_RECIPIENT_EMAIL || "amd07dev@gmail.com";
const CAREERS_EMAIL = process.env.CAREERS_EMAIL || "careers@hbc-engineering.com"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract all form fields
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phoneCountryCode = formData.get("phoneCountryCode") as string;
    const phone = formData.get("phone") as string;
    const profile = formData.get("profile") as string;

    const addressStreet = formData.get("addressStreet") as string;
    const addressLine2 = formData.get("addressLine2") as string;
    const addressCity = formData.get("addressCity") as string;
    const addressRegion = formData.get("addressRegion") as string;
    const addressPostal = formData.get("addressPostal") as string;
    const addressCountry = formData.get("addressCountry") as string;

    const coverLetter = formData.get("coverLetter") as string;
    const position = formData.get("position") as string;
    const slug = formData.get("slug") as string;
    const signature = formData.get("signature") as string;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, or phone" },
        { status: 400 }
      );
    }

    // Get CV file (required)
    const cvFile = formData.get("cv") as File;
    if (!cvFile) {
      return NextResponse.json(
        { error: "CV is required" },
        { status: 400 }
      );
    }

    // Get additional files (optional)
    const additionalFiles = formData.getAll("files") as File[];

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

    // Convert files to attachments format for Nodemailer
    const attachments = [];

    // Add CV
    const cvBuffer = await cvFile.arrayBuffer();
    attachments.push({
      filename: cvFile.name,
      content: Buffer.from(cvBuffer),
    });

    // Add additional files
    for (const file of additionalFiles) {
      if (file && file.size > 0) {
        const buffer = await file.arrayBuffer();
        attachments.push({
          filename: file.name,
          content: Buffer.from(buffer),
        });
      }
    }

    // Build email HTML content
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; border: 1px solid #e5e7eb; }
    .section h2 { margin-top: 0; color: #1f2937; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 8px; }
    .field { margin-bottom: 12px; }
    .label { font-weight: 600; color: #4b5563; display: inline-block; min-width: 140px; }
    .value { color: #1f2937; }
    .cover-letter { background: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #667eea; margin-top: 10px; white-space: pre-wrap; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
    .attachments { background: #fef3c7; padding: 12px; border-radius: 6px; border-left: 4px solid #f59e0b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Job Application</h1>
      <p style="margin: 8px 0 0 0; opacity: 0.9;">${position || "Position"}</p>
    </div>

    <div class="content">
      <!-- Personal Information -->
      <div class="section">
        <h2>Personal Information</h2>
        <div class="field">
          <span class="label">Name:</span>
          <span class="value">${name}</span>
        </div>
        <div class="field">
          <span class="label">Email:</span>
          <span class="value"><a href="mailto:${email}">${email}</a></span>
        </div>
        <div class="field">
          <span class="label">Phone:</span>
          <span class="value">${phoneCountryCode} ${phone}</span>
        </div>
        ${profile ? `
        <div class="field">
          <span class="label">Profile:</span>
          <span class="value"><a href="${profile}" target="_blank">${profile}</a></span>
        </div>
        ` : ''}
      </div>

      <!-- Address -->
      <div class="section">
        <h2>Address</h2>
        <div class="field">
          <span class="label">Street:</span>
          <span class="value">${addressStreet}</span>
        </div>
        ${addressLine2 ? `
        <div class="field">
          <span class="label">Address Line 2:</span>
          <span class="value">${addressLine2}</span>
        </div>
        ` : ''}
        <div class="field">
          <span class="label">City:</span>
          <span class="value">${addressCity}</span>
        </div>
        ${addressRegion ? `
        <div class="field">
          <span class="label">State/Region:</span>
          <span class="value">${addressRegion}</span>
        </div>
        ` : ''}
        <div class="field">
          <span class="label">Postal Code:</span>
          <span class="value">${addressPostal}</span>
        </div>
        <div class="field">
          <span class="label">Country:</span>
          <span class="value">${addressCountry}</span>
        </div>
      </div>

      <!-- Cover Letter -->
      ${coverLetter ? `
      <div class="section">
        <h2>Cover Letter</h2>
        <div class="cover-letter">${coverLetter}</div>
      </div>
      ` : ''}

      <!-- Attachments Info -->
      <div class="section">
        <div class="attachments">
          <strong>Attachments:</strong>
          <ul style="margin: 8px 0 0 0; padding-left: 20px;">
            <li>${cvFile.name} (CV)</li>
            ${additionalFiles.map(f => `<li>${f.name}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Signature -->
      <div class="section">
        <h2>Digital Signature</h2>
        <div class="field">
          <span class="value">${signature}</span>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>This application was submitted through the HBC Group careers portal.</p>
      <p style="margin: 4px 0 0 0; color: #9ca3af; font-size: 12px;">Application ID: ${slug}-${Date.now()}</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    // Plain text version
    const textContent = `
New Job Application - ${position || "Position"}

PERSONAL INFORMATION
Name: ${name}
Email: ${email}
Phone: ${phoneCountryCode} ${phone}
${profile ? `Profile: ${profile}` : ''}

ADDRESS
Street: ${addressStreet}
${addressLine2 ? `Address Line 2: ${addressLine2}` : ''}
City: ${addressCity}
${addressRegion ? `State/Region: ${addressRegion}` : ''}
Postal Code: ${addressPostal}
Country: ${addressCountry}

${coverLetter ? `COVER LETTER\n${coverLetter}\n` : ''}

ATTACHMENTS
- ${cvFile.name} (CV)
${additionalFiles.map(f => `- ${f.name}`).join('\n')}

DIGITAL SIGNATURE
${signature}

---
Application ID: ${slug}-${Date.now()}
    `.trim();

    // Build applicant confirmation email
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
    .next-steps { background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; }
    .step { display: flex; gap: 15px; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; }
    .step:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .step-icon { flex-shrink: 0; width: 40px; height: 40px; background: #10b981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
    .step-content h3 { margin: 0 0 5px 0; font-size: 16px; color: #1f2937; }
    .step-content p { margin: 0; font-size: 14px; color: #6b7280; }
    .warning-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin: 15px 0; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
    .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0; }
    .button:hover { background: #059669; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="checkmark">✓</div>
      <h1>Application Received!</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Thank you for applying to HBC Group</p>
    </div>

    <div class="content">
      <div class="card">
        <h2>Hello ${name}!</h2>
        <p>We've successfully received your application for the <strong>${position || "position"}</strong>. This email confirms that your application is now being reviewed by our HR team.</p>
      </div>

      <div class="highlight-box">
        <strong>Application Details:</strong><br>
        <strong>Position:</strong> ${position || "N/A"}<br>
        <strong>Submitted:</strong> ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br>
        <strong>Application ID:</strong> ${slug}-${Date.now()}
      </div>

      <div class="next-steps">
        <h2 style="margin-top: 0; color: #1f2937; font-size: 18px; margin-bottom: 20px;">What Happens Next?</h2>

        <div class="step">
          <div class="step-icon">1</div>
          <div class="step-content">
            <h3>Application Review</h3>
            <p>Our HR team will carefully review your application and qualifications within the next 5-7 business days.</p>
          </div>
        </div>

        <div class="step">
          <div class="step-icon">2</div>
          <div class="step-content">
            <h3>Initial Screening</h3>
            <p>If your qualifications match our requirements, we'll contact you to schedule an initial phone or video interview.</p>
          </div>
        </div>

        <div class="step">
          <div class="step-icon">3</div>
          <div class="step-content">
            <h3>Interview Process</h3>
            <p>Selected candidates will be invited for in-person interviews with our team and department managers.</p>
          </div>
        </div>
      </div>

      <div class="warning-box">
        <strong>⚠️ Important:</strong> Please check your spam/junk folder regularly as our emails may sometimes be filtered there. Add <strong>${CAREERS_EMAIL}</strong> to your contacts to ensure you receive our messages.
      </div>

      <div class="card">
        <h2>Need Help?</h2>
        <p>If you have any questions about your application or the position, feel free to contact our HR team:</p>
        <p style="margin-top: 10px;">
          <strong>Email:</strong> <a href="mailto:${CAREERS_EMAIL}" style="color: #10b981;">${CAREERS_EMAIL}</a>
        </p>
        <p style="margin-top: 10px; font-size: 13px; color: #6b7280;">
          Please include your Application ID in any correspondence: <strong>${slug}-${Date.now()}</strong>
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
APPLICATION RECEIVED - HBC GROUP

Hello ${name},

Thank you for applying to HBC Group!

We've successfully received your application for the ${position || "position"}.

APPLICATION DETAILS
Position: ${position || "N/A"}
Submitted: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Application ID: ${slug}-${Date.now()}

WHAT HAPPENS NEXT?

1. Application Review (5-7 business days)
   Our HR team will carefully review your application and qualifications.

2. Initial Screening
   If your qualifications match our requirements, we'll contact you to schedule an initial interview.

3. Interview Process
   Selected candidates will be invited for in-person interviews with our team.

IMPORTANT: Please check your spam/junk folder regularly. Add ${CAREERS_EMAIL} to your contacts.

NEED HELP?
Email: ${CAREERS_EMAIL}
Please include your Application ID: ${slug}-${Date.now()}

---
HBC Group - Engineering Excellence Since 1994
This is an automated confirmation email.
    `.trim();

    // Send email to HR (with attachments)
    const hrEmail = await transporter.sendMail({
      from: process.env.SMTP_FROM || `"HBC Careers" <${process.env.SMTP_USER}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Application: ${position || "Position"} - ${name}`,
      text: textContent,
      html: htmlContent,
      attachments,
    });

    console.log("HR email sent successfully:", hrEmail.messageId);

    // Send confirmation email to applicant (without attachments)
    const applicantEmail = await transporter.sendMail({
      from: process.env.SMTP_FROM || `"HBC Careers" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Application Received - ${position || "Position"} at HBC Group`,
      text: confirmationText,
      html: confirmationHtml,
    });

    console.log("Applicant confirmation email sent successfully:", applicantEmail.messageId);

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        hrEmailId: hrEmail.messageId,
        applicantEmailId: applicantEmail.messageId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
