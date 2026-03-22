# HBC Engineering - Project Documentation

**HBC Engineering** is a multi-language corporate website for an industrial engineering company offering maintenance, fire protection, smart building systems, and IT solutions. Built with Next.js 15, React 19, and TypeScript.

---

## Getting Access

Log in to your GitHub account, go to [github.com/hbc-group](https://github.com/hbc-group), and find the **hbc** repository. You must be a member of the hbc-group organization to access it. Contact your team lead if you can't find it.

### Clone & Setup

```bash
# 1. Clone the repository
git clone <REPO_URL>
cd hbc

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your SMTP credentials

# 4. Start the development server
npm run dev

# 5. Open in browser
open http://localhost:3000
```

---

## Prerequisites

| Tool       | Version   | Install                                      |
|------------|-----------|----------------------------------------------|
| Node.js    | 18+       | https://nodejs.org/                          |
| npm        | 9+        | Bundled with Node.js                         |
| Git        | 2.x       | https://git-scm.com/                         |
| VS Code    | Latest    | https://code.visualstudio.com/ (recommended) |

---

## Project Overview

HBC Engineering is a B2B corporate website that showcases industrial services across four divisions:

- **Industrial Maintenance** - Electrical, mechanical, hydraulic, welding, and PLC services for heavy-duty machinery
- **Fire Protection** - Fire safety systems and compliance services
- **IT Solutions** - Software development, cloud/DevOps, AI, security, data, and web3 services
- **Intelligent Building** - Smart home, energy management, and security systems

### Core User Flow

1. Visitor lands on the homepage with animated hero and service overview
2. Navigates to specific service pages for detailed information
3. Submits inquiries via the contact form or schedules corporate meetings
4. Browses open job positions and submits applications with file uploads
5. Subscribes to the newsletter via the footer
6. Switches between 7 supported languages

### Who Uses It

- **Potential clients** exploring industrial services
- **Job seekers** applying for open positions
- **Corporate partners** scheduling B2B meetings
- **Internal HR** receiving applications via email

---

## Table of Contents

| Document | Description |
|----------|-------------|
| [architecture.md](./architecture.md) | System architecture, component hierarchy, data flow |
| [setup-guide.md](./setup-guide.md) | Full development environment setup |
| [api-reference.md](./api-reference.md) | All REST API endpoints with examples |
| [design-system.md](./design-system.md) | Colors, typography, animations, components |
| [security.md](./security.md) | Security features and authentication |
| [deployment.md](./deployment.md) | CI/CD pipeline and production deployment |
| [troubleshooting.md](./troubleshooting.md) | Common issues and debugging |
| [changelog.md](./changelog.md) | Implementation history |

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js (App Router) | 15.5.3 |
| UI Library | React | 19.1.0 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Components | shadcn/ui (Radix UI) | New York style |
| Animations | Framer Motion | 12.23.22 |
| 3D Graphics | Three.js + React Three Fiber | 0.180.0 / 9.3.0 |
| Forms | React Hook Form + Zod | 7.64.0 / 3.25.76 |
| i18n | next-intl | 4.3.12 |
| Email | Nodemailer (MXroute SMTP) | 7.0.11 |
| Icons | Lucide React + Tabler Icons | 0.544.0 / 3.35.0 |
| Scrolling | Lenis | 1.0.42 |
| Notifications | Sonner | 2.0.7 |
| Bundler | Turbopack | Built into Next.js |
| Linting | ESLint | 9.x |
| Image Processing | Sharp | 0.34.5 |

---

## Project Structure

```
hbc/
├── app/
│   ├── [locale]/                   # Locale-based routing (i18n)
│   │   ├── page.tsx                # Home page
│   │   ├── layout.tsx              # Root layout (providers, navbar, footer)
│   │   ├── industrial/page.tsx     # Industrial maintenance services
│   │   ├── fire-protection/page.tsx # Fire protection services
│   │   ├── it-solutions/page.tsx   # IT solutions with multi-step form
│   │   ├── intelligent-building/   # Smart building services
│   │   ├── company/page.tsx        # About / company page
│   │   ├── contact/page.tsx        # Contact form
│   │   ├── corporate/page.tsx      # Corporate meeting request
│   │   ├── careers/                # Job listings
│   │   │   ├── page.tsx            # All positions
│   │   │   ├── jobsData.ts         # Job definitions (hardcoded)
│   │   │   ├── [slug]/page.tsx     # Job detail
│   │   │   ├── [slug]/apply/       # Application form
│   │   │   └── thank-you/          # Confirmation page
│   │   ├── privacy-policy/         # Legal page
│   │   └── section/                # Shared home page sections
│   │       ├── Hero.tsx
│   │       ├── CoreServices.tsx
│   │       ├── About.tsx
│   │       ├── ValuesSection.tsx
│   │       └── SolutionsByAudience.tsx
│   ├── api/                        # Backend API routes
│   │   ├── contact/route.ts        # Contact form handler
│   │   ├── apply/route.ts          # Job application handler
│   │   ├── corporate/route.ts      # Meeting request handler
│   │   └── newsletter/route.ts     # Newsletter signup handler
│   └── not-found.tsx               # Custom 404 page
├── components/
│   ├── ui/                         # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── accordion.tsx
│   │   ├── select.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── checkbox.tsx
│   │   ├── separator.tsx
│   │   ├── timeline.tsx
│   │   ├── apple-cards-carousel.tsx
│   │   ├── AuroraBackground.tsx
│   │   ├── background-boxes.tsx
│   │   ├── Hero.tsx
│   │   ├── CTA.tsx
│   │   └── FaqAccordion.tsx
│   ├── navbar/Navbar.tsx           # Main navigation
│   ├── Footer.tsx                  # Site footer
│   ├── ContactForm.tsx             # Reusable contact form
│   ├── HBCGrandLoaderFull.tsx      # Splash screen loader
│   ├── FireProtectionBadge.tsx     # Floating badge
│   ├── LanguageDialog.tsx          # Language switcher
│   ├── HeroAnimated.tsx            # Animated hero section
│   ├── ServicesCarousel.tsx        # Service showcase
│   ├── 3d_logo/                    # 3D logo components
│   ├── map/                        # Map components
│   └── [other UI components]
├── i18n/
│   ├── routing.ts                  # Locale config (7 languages)
│   ├── request.ts                  # Message loading
│   └── navigation.ts              # Navigation helpers
├── messages/                       # Translation files (~1190 lines each)
│   ├── en.json                     # English (default)
│   ├── de.json                     # German
│   ├── fr.json                     # French
│   ├── it.json                     # Italian
│   ├── da.json                     # Danish
│   ├── no.json                     # Norwegian
│   └── nl.json                     # Dutch
├── lib/
│   ├── utils.ts                    # cn() helper for className merging
│   └── urls.ts                     # Route path definitions
├── config/
│   └── site.ts                     # Company contact info & metadata
├── providers/
│   └── LenisProvider.tsx           # Smooth scrolling provider
├── hooks/
│   └── use-outside-click.tsx       # Click-outside hook
├── types/
│   └── shop.ts                     # E-commerce type definitions
├── styles/
│   └── globals.css                 # Global styles + CSS variables
├── public/
│   ├── hbc-logo.glb                # 3D logo model
│   ├── hbc-logo.svg                # SVG logo
│   ├── images/                     # 60+ image assets
│   └── [favicons & PWA icons]
├── .github/
│   └── workflows/deploy.yml        # GitHub Actions CI/CD
├── middleware.ts                    # i18n routing middleware
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript config
├── components.json                 # shadcn/ui config
├── .env.local.example              # Environment variables template
└── package.json                    # Dependencies & scripts
```

---

## Development URLs

After running `npm run dev`:

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Home page (English, default locale) |
| http://localhost:3000/de | Home page (German) |
| http://localhost:3000/fr | Home page (French) |
| http://localhost:3000/industrial | Industrial services |
| http://localhost:3000/fire-protection | Fire protection services |
| http://localhost:3000/it-solutions | IT solutions |
| http://localhost:3000/careers | Job listings |
| http://localhost:3000/contact | Contact form |
| http://localhost:3000/corporate | Meeting request |
| http://localhost:3000/company | About page |

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `app/[locale]/layout.tsx` | Root layout: fonts, providers, navbar, footer, loader |
| `app/[locale]/page.tsx` | Home page with hero, services, about, values sections |
| `app/api/contact/route.ts` | Contact form SMTP handler |
| `app/api/apply/route.ts` | Job application handler with file attachments |
| `app/api/corporate/route.ts` | Corporate meeting request handler |
| `app/api/newsletter/route.ts` | Newsletter subscription handler |
| `app/[locale]/careers/jobsData.ts` | Job listings data (hardcoded, 3 positions) |
| `components/navbar/Navbar.tsx` | Glassmorphic navigation with language switcher |
| `components/HBCGrandLoaderFull.tsx` | Animated splash screen loader |
| `components/ContactForm.tsx` | Reusable contact form with Zod validation |
| `config/site.ts` | Company info (phone, email, addresses, socials) |
| `i18n/routing.ts` | i18n configuration (locales, default, prefix) |
| `lib/urls.ts` | Route path definitions for all pages |
| `middleware.ts` | next-intl middleware for locale detection |
| `next.config.ts` | Standalone output, image optimization, caching |
| `styles/globals.css` | Theme variables (OKLCH), custom animations |
| `.env.local.example` | All environment variables with descriptions |
