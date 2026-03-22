# Development Environment Setup Guide

Complete step-by-step guide to get the HBC Engineering project running locally.

---

## Prerequisites

| Tool | Minimum Version | Install Link |
|------|----------------|-------------|
| Node.js | 18.x | https://nodejs.org/ |
| npm | 9.x | Bundled with Node.js |
| Git | 2.x | https://git-scm.com/ |

**Recommended:**

| Tool | Purpose | Link |
|------|---------|------|
| VS Code | Editor | https://code.visualstudio.com/ |
| ESLint Extension | Linting in editor | VS Code Marketplace |
| Tailwind CSS IntelliSense | CSS autocomplete | VS Code Marketplace |

---

## Step 1: Get Repository Access

1. Go to [github.com/hbc-group](https://github.com/hbc-group)
2. Find the **hbc** repository
3. You must be a member of the hbc-group organization on GitHub
4. Contact your team lead if you can't find or access the repository

## Step 2: Clone the Repository

```bash
git clone <REPO_URL>
cd hbc
```

## Step 3: Install Dependencies

```bash
npm install
```

This installs ~413 packages including Next.js, React, Three.js, Tailwind CSS, and all other dependencies.

## Step 4: Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual credentials:

### SMTP Configuration (MXroute)

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `SMTP_HOST` | MXroute SMTP server | `heracles.mxrouting.net` |
| `SMTP_PORT` | SMTP port (587 for TLS, 465 for SSL) | `587` |
| `SMTP_SECURE` | SSL mode (`false` for 587, `true` for 465) | `false` |
| `SMTP_USER` | Email account | `a.dessouky@hbc-engineering.com` |
| `SMTP_PASSWORD` | Email password | *(get from team lead)* |

### Email "From" Addresses

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `SMTP_FROM` | From address for careers emails | `"HBC Careers" <careers@yourdomain.com>` |
| `SMTP_FROM_CONTACT` | From address for contact/corporate emails | `"HBC Group" <office@hbc-engineering.com>` |

### Email Recipients

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `APPLICATION_RECIPIENT_EMAIL` | Where job applications go | `hr@hbc-engineering.com` |
| `CONTACT_RECIPIENT_EMAIL` | Where contact form submissions go | `office@hbc-engineering.com` |
| `CORPORATE_RECIPIENT_EMAIL` | Where meeting requests go | `office@hbc-engineering.com` |
| `NEWSLETTER_RECIPIENT_EMAIL` | Where newsletter signups go | `office@hbc-engineering.com` |
| `OFFICE_EMAIL` | Office email shown in auto-replies | `office@hbc-engineering.com` |
| `CAREERS_EMAIL` | Careers email shown in confirmation | `careers@hbc-engineering.com` |

### Site Configuration

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `NEXT_PUBLIC_SITE_URL` | Public site URL (for OG tags) | `https://hbc-engineering.com` |

## Step 5: Start Development Server

```bash
npm run dev
```

The server starts with Turbopack at `http://localhost:3000`.

## Step 6: Verify Everything Works

| Check | URL | Expected Result |
|-------|-----|----------------|
| Home page loads | http://localhost:3000 | Animated hero, services grid |
| 3D logo renders | http://localhost:3000 | 3D HBC logo in hero section |
| Navigation works | Click "Industrial" | Industrial page with services |
| Language switch | Click language icon | Language dialog opens |
| German locale | http://localhost:3000/de | German translated content |
| Contact form | http://localhost:3000/contact | Form with validation |
| Careers page | http://localhost:3000/careers | 3 job listings |
| Job application | Click "Apply Now" on any job | Multi-step form |
| Corporate page | http://localhost:3000/corporate | Meeting request form |
| 404 page | http://localhost:3000/nonexistent | Custom 404 with animation |

### Email Testing

1. Fill out the contact form at `/contact`
2. Check the recipient inbox (configured in `.env.local`)
3. Verify both the notification email and confirmation email arrive
4. Check that HTML formatting and content are correct

---

## All CLI Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack (http://localhost:3000) |
| `npm run build` | Create production build with Turbopack |
| `npm run start` | Start production server (after build) |
| `npm run lint` | Run ESLint on the codebase |
| `ANALYZE=true npm run build` | Build with bundle analysis |

---

## Project Configuration Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js config: standalone output, image optimization, caching |
| `tsconfig.json` | TypeScript: strict mode, path aliases (`@/*`) |
| `postcss.config.mjs` | PostCSS with Tailwind CSS v4 |
| `eslint.config.mjs` | ESLint with Next.js + TypeScript rules |
| `components.json` | shadcn/ui: New York style, Lucide icons, Neutral base |
| `middleware.ts` | next-intl locale routing middleware |
| `.env.local.example` | Environment variables template |

---

## VS Code Recommended Settings

The project includes `.vscode/` settings. For the best experience, install:

1. **ESLint** - Real-time linting
2. **Tailwind CSS IntelliSense** - Class name autocomplete
3. **TypeScript and JavaScript Language Features** - Built into VS Code
4. **Prettier** (optional) - Code formatting

---

## Troubleshooting Setup Issues

### `npm install` fails

```bash
# Clear npm cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use

```bash
# Find and kill the process on port 3000
lsof -i :3000
kill -9 <PID>
```

### SMTP emails not sending

1. Verify `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` in `.env.local`
2. Test SMTP connection: `telnet heracles.mxrouting.net 587`
3. Ensure port 587 isn't blocked by firewall
4. Check the terminal for error logs when submitting a form

### 3D logo not rendering

- The GLB file is served from `/public/hbc-logo.glb`
- Check browser console for WebGL errors
- Ensure your browser supports WebGL 2.0

### Translations not loading

- Check that all 7 message files exist in `messages/`
- Verify the locale in the URL matches a supported locale
- Restart the dev server after adding new translation keys
