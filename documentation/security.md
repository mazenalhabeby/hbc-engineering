# Security Documentation

## Security Features Overview

| Feature | Implementation | Status |
|---------|---------------|--------|
| SMTP Credentials | Server-side only (`.env.local`) | Active |
| Honeypot Bot Prevention | Hidden `website` field on forms | Active |
| Form Validation (Client) | Zod schemas via React Hook Form | Active |
| Form Validation (Server) | Manual field checks in API routes | Active |
| Email Encryption | STARTTLS via SMTP port 587 | Active |
| File Type Validation | Whitelist (PDF, DOC, DOCX, images, ZIP) | Active |
| File Size Limits | 10MB per file | Active |
| Consent Verification | Required checkbox on all forms | Active |
| Error Message Sanitization | Generic messages in production | Active |
| DNS Prefetch Control | Header enabled | Active |
| Static Asset Caching | Immutable cache headers (1 year) | Active |

---

## Environment Variables Security

All sensitive data is stored in `.env.local` which is:

- Listed in `.gitignore` (never committed)
- Only accessible server-side (API routes)
- Template provided as `.env.local.example` (without real credentials)

**Server-only variables** (never exposed to the browser):
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`
- `SMTP_USER`, `SMTP_PASSWORD`
- `SMTP_FROM`, `SMTP_FROM_CONTACT`
- All `*_RECIPIENT_EMAIL` variables
- `OFFICE_EMAIL`, `CAREERS_EMAIL`

**Public variables** (exposed to the browser via `NEXT_PUBLIC_` prefix):
- `NEXT_PUBLIC_SITE_URL` - Used for metadata/OG tags only

---

## Bot Prevention

Two forms use honeypot fields:

### Contact Form (`/api/contact`)
```typescript
const website = formData.get("website") as string;
if (website) {
  return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
}
```

### Newsletter Form (`/api/newsletter`)
```typescript
const website = formData.get("website") as string;
if (website) {
  return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
}
```

The `website` field is hidden from real users via CSS. Bots that auto-fill all fields will trigger the honeypot and be rejected.

---

## Input Validation

### Client-Side (Zod + React Hook Form)

Forms use Zod schemas for real-time validation:
- Required field checks
- Email format validation
- Phone number format validation
- URL validation for profile links
- File size and type validation

### Server-Side (API Routes)

Every API route validates:
1. Required fields present (`name`, `email`, etc.)
2. Consent checkbox checked
3. Honeypot field empty (where applicable)
4. File presence (CV required for applications)
5. Email format (newsletter route uses regex)

---

## Email Security

### SMTP Connection

- **Protocol:** STARTTLS (port 587)
- **Authentication:** Username + password required
- **Provider:** MXroute (heracles.mxrouting.net)
- **Encryption:** TLS for data in transit

### Email Sending

- Reply-To headers set to the original sender (not the SMTP account)
- From addresses use verified domain emails
- Both HTML and plain text versions sent (prevents spam filtering)
- File attachments properly buffered and encoded

---

## Error Handling

### Development Mode

Detailed error messages returned for debugging:
```json
{
  "error": "An unexpected error occurred. Please try again later.",
  "details": "SMTP connection timeout after 30000ms"
}
```

### Production Mode

Generic error messages only:
```json
{
  "error": "An unexpected error occurred. Please try again later."
}
```

Stack traces and internal error details are logged server-side only (`console.error`).

---

## Security Best Practices for Developers

1. **Never commit `.env.local`** -- it contains SMTP credentials
2. **Never expose SMTP credentials** in client components -- they are server-only
3. **Always validate on the server** -- client-side validation can be bypassed
4. **Keep honeypot fields** on all public forms
5. **Check consent flags** before processing submissions
6. **Use the `NEXT_PUBLIC_` prefix** only for values safe to expose in the browser
7. **Rotate SMTP passwords** regularly via MXroute control panel
8. **Monitor email sending** for unusual volume or patterns
9. **Keep dependencies updated** -- run `npm audit` periodically
10. **Review file uploads** -- ensure file type and size limits are enforced

---

## Headers

Configured in `next.config.ts`:

| Header | Value | Applied To |
|--------|-------|-----------|
| `X-DNS-Prefetch-Control` | `on` | All routes |
| `Cache-Control` | `public, max-age=31536000, immutable` | `/images/*`, `/_next/static/*`, `/_next/image/*`, `/hbc-logo.glb` |
