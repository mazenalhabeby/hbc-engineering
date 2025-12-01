# Careers Application System Setup

This document explains how to configure and use the job application system that sends applications via email using your existing MXroute email service.

## Features

- **Professional Form**: Multi-step application form with validation
- **Email Delivery**: Applications sent via SMTP using your MXroute email
- **File Attachments**: CV and additional documents included in emails
- **Toast Notifications**: Modern user feedback with Sonner
- **Beautiful Email Templates**: HTML-formatted application emails

## Setup Instructions

### 1. Install Dependencies

The required packages are already installed:
- `nodemailer` - SMTP email sending
- `@types/nodemailer` - TypeScript types
- `sonner` - Toast notifications

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Get your MXroute SMTP credentials:
   - Log into your MXroute control panel
   - Find your SMTP server details (usually `mxlogin.com` or your specific server)
   - Get your email credentials (email and password)

3. Edit `.env.local` and add your MXroute SMTP details:
   ```env
   # MXroute SMTP server (check your control panel)
   SMTP_HOST=mxlogin.com

   # Port: 587 for TLS (recommended) or 465 for SSL
   SMTP_PORT=587

   # Use SSL: false for port 587, true for port 465
   SMTP_SECURE=false

   # Your full email address
   SMTP_USER=careers@yourdomain.com

   # Your email password
   SMTP_PASSWORD=your_password_here

   # From address (usually same as SMTP_USER)
   SMTP_FROM="HBC Careers" <careers@yourdomain.com>

   # Where applications should be sent
   APPLICATION_RECIPIENT_EMAIL=amd07dev@gmail.com
   ```

### 3. MXroute SMTP Settings

Common MXroute SMTP configurations:

**Standard Configuration (Recommended)**:
- Host: `mxlogin.com` (or check your MXroute welcome email)
- Port: `587`
- Security: `STARTTLS` (SMTP_SECURE=false)
- Authentication: Required (your email & password)

**Alternative Configuration**:
- Host: `mxlogin.com`
- Port: `465`
- Security: `SSL/TLS` (SMTP_SECURE=true)
- Authentication: Required (your email & password)

**Note**: Your specific SMTP host may be different. Check your MXroute welcome email or control panel for the exact hostname.

## How It Works

### Application Flow

1. **User fills out the form** at `/careers/[job-slug]/apply`
2. **Form validates** required fields (name, email, phone, address, CV)
3. **User reviews** their information
4. **Form submits** to `/api/apply` API route
5. **API route processes** the form data and files
6. **Email is sent** via your MXroute SMTP server with all attachments
7. **User redirects** to thank you page
8. **Toast notifications** provide feedback throughout

### API Route (`/app/api/apply/route.ts`)

The API route handles:
- Form data parsing from multipart/form-data
- File validation (CV required, additional files optional)
- Converting files to Buffer for email attachments
- Creating HTML and plain text email versions
- Sending email via SMTP using Nodemailer
- Error handling with proper status codes

### Frontend (`/app/[locale]/careers/[slug]/apply/page.tsx`)

The form includes:
- Multi-step wizard (Personal & Documents → Review)
- React Hook Form for form state management
- Zod for validation
- File upload with drag & drop
- Country code phone input
- Auto-detection of user's country via IP
- Toast notifications for success/error states

## Email Templates

The system sends **TWO emails** per application:

### 1. Email to HR (with attachments)
- **To**: `amd07dev@gmail.com` (configurable)
- **Subject**: `New Application: [Position Name] - [Applicant Name]`
- **Reply-To**: Applicant's email address (so you can reply directly)
- **Template**: Purple gradient header, organized sections
- **Attachments**: CV + any additional files uploaded
- **Format**: HTML + Plain text fallback

### 2. Confirmation Email to Applicant
- **To**: Applicant's email address
- **Subject**: `Application Received - [Position Name] at HBC Group`
- **Template**: Green gradient header, professional confirmation
- **Content**:
  - Personalized greeting
  - Application details (position, date, ID)
  - Next steps timeline (Review → Screening → Interview)
  - Spam folder reminder
  - HR contact information
  - Company branding
- **Format**: HTML + Plain text fallback
- **Note**: No attachments (applicant already has their files)

## Testing

### Development Testing

1. Ensure your SMTP credentials are correct in `.env.local`
2. Start the development server: `npm run dev`
3. Go to a job listing and click "Apply Now"
4. Fill out and submit a test application
5. Check the recipient email inbox (amd07dev@gmail.com)
6. Verify all data and attachments are included

### Troubleshooting SMTP Connection

If emails aren't sending, check:

1. **SMTP Credentials**: Ensure email and password are correct
2. **SMTP Host**: Verify the hostname (check MXroute control panel)
3. **Port and Security**: Match port with security setting (587=false, 465=true)
4. **Firewall**: Ensure your server allows outbound connections on the SMTP port
5. **MXroute Limits**: Check if you've hit sending limits
6. **Console Logs**: Look for errors in terminal/console

Common errors:

- **"Connection timeout"**: Check firewall, verify SMTP host and port
- **"Authentication failed"**: Wrong email or password
- **"Connection refused"**: Wrong port or host
- **"ECONNRESET"**: SSL/TLS mismatch (check SMTP_SECURE setting)

### Testing SMTP Connection

Test your SMTP connection with a simple command:

```bash
# Install telnet if needed
telnet mxlogin.com 587
```

You should see a response from the server. If not, check your network/firewall.

## File Size Limits

- CV: Max 10MB (required)
- Additional files: Max 10MB each (optional, up to 5 files)
- Allowed types: PDF, DOC, DOCX, PNG, JPG, JPEG, ZIP

## Best Practices

1. **Never commit `.env.local`** - It contains sensitive credentials
2. **Use strong email passwords** - Consider using app-specific passwords if available
3. **Monitor MXroute usage** - Keep track of email sending limits
4. **Test thoroughly** before going live
5. **Keep SMTP credentials secure** - Don't share or expose them
6. **Check spam folders** - Initial test emails may land in spam

## MXroute Information

- **Control Panel**: Access your MXroute control panel for SMTP settings
- **Limits**: Check your plan's sending limits
- **Support**: Contact MXroute support if you have connection issues
- **Documentation**: https://mxroute.com/

## Security Notes

- SMTP credentials are stored server-side only (`.env.local`)
- Passwords are never exposed to the frontend
- Use STARTTLS (port 587) for encrypted connections
- Keep your MXroute password secure and rotate it regularly

## Alternative Email Services

If you want to use a different email service instead of MXroute:

1. Update `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` for your provider
2. Update `SMTP_USER` and `SMTP_PASSWORD` with your credentials
3. Common providers:
   - **Gmail**: `smtp.gmail.com:587` (use app password)
   - **Outlook**: `smtp-mail.outlook.com:587`
   - **SendGrid**: `smtp.sendgrid.net:587`
   - **Mailgun**: `smtp.mailgun.org:587`

## Support

- Nodemailer Documentation: [https://nodemailer.com/](https://nodemailer.com/)
- MXroute Support: [https://mxroute.com/](https://mxroute.com/)
- Sonner Documentation: [https://sonner.emilkowal.ski](https://sonner.emilkowal.ski)
