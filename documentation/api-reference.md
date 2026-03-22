# API Reference

All API routes are located in `app/api/` and accept only `POST` requests. There is no authentication required -- these are public form submission endpoints.

---

## Contact Form

### `POST /api/contact`

Handles general inquiries from the contact page. Sends a notification email to the office and a confirmation email to the sender.

**Content-Type:** `multipart/form-data` (FormData)

**Request Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Sender's full name |
| `email` | string | Yes | Sender's email address |
| `company` | string | No | Sender's company name |
| `phone` | string | No | Sender's phone number |
| `service` | string | No | Service of interest |
| `message` | string | No | Inquiry message |
| `consent` | string | Yes | Must be `"on"` (checkbox checked) |
| `website` | string | No | Honeypot field -- must be empty |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Message sent successfully",
  "officeEmailId": "<message-id@mxrouting.net>",
  "senderEmailId": "<message-id@mxrouting.net>"
}
```

**Error Responses:**

| Status | Condition | Response |
|--------|-----------|----------|
| 400 | Honeypot filled (bot) | `{ "error": "Invalid submission" }` |
| 400 | Missing name or email | `{ "error": "Missing required fields: name and email" }` |
| 400 | Consent not checked | `{ "error": "You must agree to be contacted" }` |
| 500 | SMTP or server error | `{ "error": "An unexpected error occurred..." }` |

**Emails sent:**
1. **To office:** Subject `New Contact Form: {service} - {name}`, Reply-To set to sender
2. **To sender:** Subject `We received your message - HBC Group`

---

## Job Application

### `POST /api/apply`

Handles job applications with file uploads. Sends application with attachments to HR and a confirmation email to the applicant.

**Content-Type:** `multipart/form-data` (FormData)

**Request Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Applicant's full name |
| `email` | string | Yes | Applicant's email |
| `phoneCountryCode` | string | No | Phone country code (e.g., `+1`) |
| `phone` | string | Yes | Phone number |
| `profile` | string | No | LinkedIn/portfolio URL |
| `addressStreet` | string | No | Street address |
| `addressLine2` | string | No | Address line 2 |
| `addressCity` | string | No | City |
| `addressRegion` | string | No | State/region |
| `addressPostal` | string | No | Postal code |
| `addressCountry` | string | No | Country |
| `position` | string | No | Position title |
| `coverLetter` | string | No | Cover letter text |
| `slug` | string | No | Job slug (used in application ID) |
| `signature` | string | No | Digital signature text |
| `cv` | File | Yes | CV file (PDF, DOC, DOCX) |
| `files` | File[] | No | Additional documents (up to 5) |

**File Constraints:**
- CV: Max 10MB, required
- Additional files: Max 10MB each, up to 5 files
- Allowed types: PDF, DOC, DOCX, PNG, JPG, JPEG, ZIP

**Success Response (200):**

```json
{
  "success": true,
  "message": "Application submitted successfully",
  "hrEmailId": "<message-id@mxrouting.net>",
  "applicantEmailId": "<message-id@mxrouting.net>"
}
```

**Error Responses:**

| Status | Condition | Response |
|--------|-----------|----------|
| 400 | Missing name, email, or phone | `{ "error": "Missing required fields: name, email, or phone" }` |
| 400 | No CV file | `{ "error": "CV is required" }` |
| 500 | SMTP or server error | `{ "error": "An unexpected error occurred..." }` |

**Emails sent:**
1. **To HR:** Subject `New Application: {position} - {name}`, with file attachments, Reply-To set to applicant
2. **To applicant:** Subject `Application Received - {position} at HBC Group`, includes application ID and next steps timeline

**Application ID format:** `{slug}-{timestamp}` (e.g., `industrial-electrician-1709913600000`)

---

## Corporate Meeting Request

### `POST /api/corporate`

Handles corporate/B2B meeting scheduling requests. Sends notification to the corporate team and confirmation to the requester.

**Content-Type:** `application/json`

**Request Body:**

```json
{
  "name": "John Smith",
  "email": "john@company.com",
  "company": "ACME Corp",
  "phone": "+1-555-0123",
  "topic": "Industrial Maintenance",
  "size": "50-200 employees",
  "date": "2025-03-15",
  "time": "10:00 AM",
  "message": "We'd like to discuss maintenance contracts.",
  "consent": true
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Contact's full name |
| `email` | string | Yes | Contact's email |
| `company` | string | No | Company name |
| `phone` | string | No | Phone number |
| `topic` | string | No | Meeting topic |
| `size` | string | No | Company size |
| `date` | string | No | Preferred meeting date |
| `time` | string | No | Preferred meeting time |
| `message` | string | No | Additional message |
| `consent` | boolean | Yes | Must be `true` |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Meeting request sent successfully",
  "officeEmailId": "<message-id@mxrouting.net>",
  "senderEmailId": "<message-id@mxrouting.net>"
}
```

**Error Responses:**

| Status | Condition | Response |
|--------|-----------|----------|
| 400 | Missing name or email | `{ "error": "Missing required fields: name and email" }` |
| 400 | Consent not given | `{ "error": "You must agree to the privacy policy" }` |
| 500 | SMTP or server error | `{ "error": "An unexpected error occurred..." }` |

**Emails sent:**
1. **To corporate team:** Subject `New Meeting Request: {topic} - {name}`, Reply-To set to sender
2. **To sender:** Subject `Meeting Request Received - HBC Group`

---

## Newsletter Subscription

### `POST /api/newsletter`

Handles newsletter signups from the site footer. Sends notification to office and welcome email to subscriber.

**Content-Type:** `multipart/form-data` (FormData)

**Request Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Subscriber's email address |
| `website` | string | No | Honeypot field -- must be empty |

**Email Validation:** Basic regex pattern `^[^\s@]+@[^\s@]+\.[^\s@]+$`

**Success Response (200):**

```json
{
  "success": true,
  "message": "Thank you for subscribing to our newsletter!",
  "notificationEmailId": "<message-id@mxrouting.net>",
  "confirmationEmailId": "<message-id@mxrouting.net>"
}
```

**Error Responses:**

| Status | Condition | Response |
|--------|-----------|----------|
| 400 | Honeypot filled (bot) | `{ "error": "Invalid submission" }` |
| 400 | Missing email | `{ "error": "Email is required" }` |
| 400 | Invalid email format | `{ "error": "Please enter a valid email address" }` |
| 500 | SMTP or server error | `{ "error": "An unexpected error occurred..." }` |

**Emails sent:**
1. **To office:** Subject `New Newsletter Subscription: {email}`
2. **To subscriber:** Subject `Welcome to HBC Group Newsletter`

---

## Common Patterns

### Error Response in Development vs Production

All API routes include environment-aware error details:

```json
// Development (NODE_ENV === "development")
{
  "error": "An unexpected error occurred. Please try again later.",
  "details": "SMTP connection timeout after 30000ms"
}

// Production
{
  "error": "An unexpected error occurred. Please try again later."
}
```

### SMTP Transport Configuration

All routes create a Nodemailer transporter with the same configuration:

```typescript
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,           // heracles.mxrouting.net
  port: parseInt(process.env.SMTP_PORT), // 587
  secure: process.env.SMTP_SECURE === "true", // false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});
```

### Bot Prevention

Contact and newsletter forms use a honeypot field (`website`). If the field contains any value, the submission is rejected with HTTP 400.
