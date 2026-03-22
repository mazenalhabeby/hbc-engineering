# Architecture

## System Overview

HBC Engineering is a server-rendered Next.js application using the App Router with locale-based routing for internationalization. It has no database -- all data is hardcoded or submitted via email through SMTP.

```
                           ┌─────────────────────────────────────────────┐
                           │              Client Browser                │
                           │                                            │
                           │  ┌──────────┐  ┌──────────┐  ┌─────────┐  │
                           │  │ React UI │  │ 3D Logo  │  │ Framer  │  │
                           │  │ (shadcn) │  │ (Three)  │  │ Motion  │  │
                           │  └────┬─────┘  └────┬─────┘  └────┬────┘  │
                           │       │             │             │        │
                           │       └─────────────┼─────────────┘        │
                           │                     │                      │
                           └─────────────────────┼──────────────────────┘
                                                 │
                                    HTTPS (port 3000 dev)
                                                 │
                           ┌─────────────────────┼──────────────────────┐
                           │              Next.js Server                │
                           │                     │                      │
                           │  ┌──────────────────┼───────────────────┐  │
                           │  │           Middleware                  │  │
                           │  │     (next-intl locale detection)     │  │
                           │  └──────────────────┼───────────────────┘  │
                           │                     │                      │
                           │         ┌───────────┼───────────┐          │
                           │         │           │           │          │
                           │    ┌────▼───┐  ┌────▼───┐  ┌───▼────┐     │
                           │    │ Pages  │  │  API   │  │ Static │     │
                           │    │ (SSR/  │  │ Routes │  │ Assets │     │
                           │    │  SSG)  │  │ (POST) │  │        │     │
                           │    └────────┘  └───┬────┘  └────────┘     │
                           │                    │                       │
                           └────────────────────┼───────────────────────┘
                                                │
                                          SMTP (port 587)
                                                │
                                     ┌──────────▼──────────┐
                                     │   MXroute SMTP      │
                                     │   (Email Delivery)  │
                                     │                     │
                                     │  heracles.mxrouting │
                                     │       .net          │
                                     └─────────────────────┘
```

---

## Application Layers

### 1. Middleware Layer

**File:** `middleware.ts`

The middleware intercepts every non-API, non-static request and handles locale detection/routing via `next-intl`.

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);
export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)']
};
```

**Request flow:**
1. Request comes in (e.g., `/de/contact`)
2. Middleware extracts locale from URL
3. If locale is valid, sets it for the request
4. If no locale in URL and locale is default (`en`), serves without prefix
5. API routes (`/api/*`) and static files bypass middleware entirely

### 2. Page Rendering Layer

**Directory:** `app/[locale]/`

All pages use the `[locale]` dynamic segment for i18n. Pages are a mix of Server Components (default) and Client Components (interactive parts).

**Layout chain:**
```
app/[locale]/layout.tsx
├── <html> with locale, fonts
├── NextIntlClientProvider
│   ├── HBCGrandLoaderFull (splash screen)
│   ├── LenisProvider (smooth scrolling)
│   │   ├── GlassyNavbar
│   │   ├── {children} (page content)
│   │   └── CinematicFooter
│   └── FireProtectionBadge (floating)
```

**Page components load order:**
1. Layout renders with navbar, footer, loader
2. Page-specific content renders (Server Component)
3. Client Components hydrate (forms, animations, 3D)
4. Dynamic imports load lazily (FireProtectionBadge, sections)

### 3. API Layer

**Directory:** `app/api/`

Four POST-only API routes handle form submissions. All follow the same pattern:

```
Request → Validate → Create SMTP Transport → Send Email(s) → Response
```

| Route | Input Format | Sends To | Confirmation |
|-------|-------------|----------|-------------|
| `/api/contact` | FormData | CONTACT_RECIPIENT_EMAIL | Yes, to sender |
| `/api/apply` | FormData (multipart) | APPLICATION_RECIPIENT_EMAIL | Yes, to applicant |
| `/api/corporate` | JSON | CORPORATE_RECIPIENT_EMAIL | Yes, to sender |
| `/api/newsletter` | FormData | NEWSLETTER_RECIPIENT_EMAIL | Yes, to subscriber |

Each API route:
- Creates a new Nodemailer SMTP transporter per request
- Sends styled HTML + plain text fallback emails
- Sends confirmation email back to the user
- Returns JSON with success status and email message IDs

### 4. Internationalization Layer

**Directory:** `i18n/` and `messages/`

```
i18n/
├── routing.ts      # Locale list, default, prefix strategy
├── request.ts      # Server-side message loading
└── navigation.ts   # Typed Link, useRouter, usePathname

messages/
├── en.json         # ~1190 lines of translations
├── de.json
├── fr.json
├── it.json
├── da.json
├── no.json
└── nl.json
```

**Supported locales:** `en` (default), `de`, `fr`, `it`, `da`, `no`, `nl`

**Locale prefix strategy:** `as-needed` -- English URLs have no prefix (`/contact`), other locales get prefixed (`/de/contact`).

**Usage in components:**
```typescript
// Server Component
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations('navbar');
  return <span>{t('contact')}</span>;
}
```

### 5. Component Architecture

```
components/
├── ui/                     # Primitives (shadcn/ui + custom)
│   ├── button.tsx          # Radix Slot-based button
│   ├── dialog.tsx          # Radix Dialog
│   ├── accordion.tsx       # Radix Accordion
│   ├── select.tsx          # Radix Select
│   ├── input.tsx           # Styled input
│   ├── textarea.tsx        # Styled textarea
│   ├── checkbox.tsx        # Radix Checkbox
│   ├── AuroraBackground    # Animated blob background
│   ├── background-boxes    # CSS grid hover effect
│   ├── Hero.tsx            # Reusable hero section
│   └── CTA.tsx             # Call-to-action block
│
├── navbar/Navbar.tsx       # Top-level navigation
│   ├── Desktop menu (pill-shaped glassmorphism bar)
│   ├── Mobile drawer (portal-based, slide-in)
│   ├── ShopButton (links to 8bc.store)
│   └── LanguageDialog (dynamic import)
│
├── Footer.tsx              # Company info, links, newsletter
├── ContactForm.tsx         # Zod-validated contact form
├── HBCGrandLoaderFull.tsx  # Full-screen branded loader
├── FireProtectionBadge.tsx # Floating external link badge
├── HeroAnimated.tsx        # Framer Motion hero
├── ServicesCarousel.tsx    # Apple-style cards carousel
├── GradientBlobs.tsx       # Animated background blobs
├── TiltCard.tsx            # 3D tilt-on-hover card
├── GlassCard.tsx           # Glassmorphism card
└── 3d_logo/                # React Three Fiber logo scene
```

### 6. Styling Architecture

The app uses Tailwind CSS v4 with OKLCH color space and CSS custom properties:

```
styles/globals.css
├── Tailwind imports (@import "tailwindcss")
├── Theme variables (:root / .dark)
│   ├── --primary (OKLCH warm color)
│   ├── --secondary (OKLCH blue)
│   ├── --background, --foreground
│   ├── --card, --popover, --muted, etc.
│   └── --chart-1 through --chart-5
├── Utility classes
│   ├── .font-geist, .font-geist-mono
│   ├── .font-orbitron, .font-manrope
│   └── .animate-appear
├── Custom animations
│   ├── aurora-drift-1 through aurora-drift-5
│   ├── aurora-shimmer
│   ├── btn-pulse
│   └── nf-appear (404 page)
└── Component styles (.not-found, .box-cell)
```

---

## Data Flow

### Contact Form Submission

```
User fills form → Client validates (Zod) → FormData POST to /api/contact
                                                      │
                                              Honeypot check
                                              Field validation
                                                      │
                                              ┌───────▼───────┐
                                              │ SMTP Transport │
                                              └───────┬───────┘
                                                      │
                                    ┌─────────────────┼─────────────────┐
                                    │                                   │
                          ┌─────────▼─────────┐             ┌──────────▼──────────┐
                          │ Notification Email │             │ Confirmation Email  │
                          │ → Office inbox     │             │ → User inbox        │
                          └───────────────────┘             └─────────────────────┘
```

### Job Application Submission

```
User fills multi-step form → Uploads CV + files → Review step → Submit
                                                                   │
                                                          FormData POST
                                                          /api/apply
                                                                   │
                                                   ┌───────────────┼───────────────┐
                                                   │                               │
                                     ┌─────────────▼──────────────┐    ┌──────────▼──────────┐
                                     │ HR Email (with attachments) │    │ Applicant Email      │
                                     │ Subject: New Application    │    │ Subject: App Received│
                                     │ Reply-To: applicant email   │    │ Next steps timeline  │
                                     └────────────────────────────┘    └─────────────────────┘
```

---

## Infrastructure Components

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Web Server | Next.js Standalone | SSR + API routes |
| SMTP | MXroute (heracles.mxrouting.net:587) | Email delivery |
| CDN/Assets | Next.js built-in | Static files, images |
| 3D Assets | GLB files served statically | 3D logo model |
| CI/CD | GitHub Actions | Automated deployment |
| Production Server | SSH-accessible Linux server | Hosts the app at /srv/hbc-site/ |

---

## External Integrations

| Service | URL | Purpose |
|---------|-----|---------|
| MXroute SMTP | heracles.mxrouting.net | Email sending |
| 8BC Store | https://8bc.store | Workwear shop (external link) |
| LinkedIn | linkedin.com/company/hbc-engineering | Social link |
| WhatsApp | wa.me/436601234567 | Contact link |
| Unsplash | images.unsplash.com | Remote images |
| Aceternity | assets.aceternity.com | UI component assets |
