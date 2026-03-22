# HBC Engineering

Multi-language corporate website for HBC Engineering -- industrial maintenance, fire protection, smart building systems, and IT solutions.

## Quick Start

```bash
git clone <REPO_URL>              # 1. Clone the repo
cd hbc && npm install             # 2. Install dependencies
cp .env.local.example .env.local  # 3. Set up environment
# Edit .env.local with SMTP credentials
npm run dev                       # 4. Start dev server
open http://localhost:3000        # 5. Open in browser
```

> **GitHub Access:** Go to [github.com/hbc-group](https://github.com/hbc-group) and find the **hbc** repository. You must be a member of the hbc-group organization. Contact your team lead for access.

## Architecture

```
┌──────────────────────────────────────────────────┐
│                 Client Browser                   │
│  React 19 + Three.js + Framer Motion + Tailwind  │
└────────────────────┬─────────────────────────────┘
                     │ HTTPS
┌────────────────────┼─────────────────────────────┐
│              Next.js 15 Server                   │
│                    │                             │
│  ┌─────────────────┼──────────────────────┐      │
│  │         Middleware (next-intl)          │      │
│  │     Locale detection & routing         │      │
│  └─────────────────┼──────────────────────┘      │
│                    │                             │
│     ┌──────────────┼──────────────┐              │
│     │              │              │              │
│  ┌──▼───┐   ┌──────▼─────┐  ┌────▼────┐         │
│  │Pages │   │ API Routes │  │ Static  │         │
│  │(SSR) │   │  (POST)    │  │ Assets  │         │
│  └──────┘   └──────┬─────┘  └─────────┘         │
│                    │                             │
└────────────────────┼─────────────────────────────┘
                     │ SMTP (port 587)
              ┌──────▼──────┐
              │   MXroute   │
              │ Email SMTP  │
              └─────────────┘
```

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js (App Router, Turbopack) | 15.5.3 |
| UI | React | 19.1.0 |
| Language | TypeScript (strict) | 5.x |
| Styling | Tailwind CSS + shadcn/ui | 4.x |
| Animations | Framer Motion | 12.23.22 |
| 3D | Three.js + React Three Fiber | 0.180.0 |
| Forms | React Hook Form + Zod | 7.64.0 |
| i18n | next-intl (7 languages) | 4.3.12 |
| Email | Nodemailer (MXroute SMTP) | 7.0.11 |
| CI/CD | GitHub Actions (SSH deploy) | -- |

## Project Structure

```
hbc/
├── app/
│   ├── [locale]/              # Pages with i18n routing
│   │   ├── page.tsx           # Home
│   │   ├── industrial/        # Industrial maintenance
│   │   ├── fire-protection/   # Fire protection
│   │   ├── it-solutions/      # IT solutions
│   │   ├── intelligent-building/
│   │   ├── company/           # About
│   │   ├── contact/           # Contact form
│   │   ├── corporate/         # Meeting requests
│   │   ├── careers/           # Job listings & applications
│   │   └── privacy-policy/
│   └── api/                   # REST endpoints
│       ├── contact/           # POST - contact form
│       ├── apply/             # POST - job application
│       ├── corporate/         # POST - meeting request
│       └── newsletter/        # POST - newsletter signup
├── components/                # React components
│   ├── ui/                    # shadcn/ui primitives
│   ├── navbar/                # Navigation
│   └── [feature components]
├── i18n/                      # Internationalization config
├── messages/                  # Translations (en, de, fr, it, da, no, nl)
├── lib/                       # Utilities
├── config/                    # Site configuration
├── providers/                 # React providers
├── styles/                    # Global CSS
├── public/                    # Static assets (images, 3D models)
└── .github/                   # CI/CD & templates
```

## Supported Languages

| Code | Language | URL Example |
|------|----------|-------------|
| `en` | English (default) | `/contact` |
| `de` | German | `/de/contact` |
| `fr` | French | `/fr/contact` |
| `it` | Italian | `/it/contact` |
| `da` | Danish | `/da/contact` |
| `no` | Norwegian | `/no/contact` |
| `nl` | Dutch | `/nl/contact` |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `ANALYZE=true npm run build` | Bundle analysis |

## Documentation

Full documentation is in the [`documentation/`](./documentation/) folder:

| Document | Description |
|----------|-------------|
| [README.md](./documentation/README.md) | Project overview & setup |
| [architecture.md](./documentation/architecture.md) | System design & data flow |
| [setup-guide.md](./documentation/setup-guide.md) | Full dev environment setup |
| [api-reference.md](./documentation/api-reference.md) | All API endpoints |
| [design-system.md](./documentation/design-system.md) | Colors, fonts, components |
| [security.md](./documentation/security.md) | Security features |
| [deployment.md](./documentation/deployment.md) | CI/CD & production |
| [troubleshooting.md](./documentation/troubleshooting.md) | Common issues & fixes |
| [changelog.md](./documentation/changelog.md) | Implementation history |

## Contributing

See [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for code conventions, git workflow, and how-to guides.

## License

Proprietary. All rights reserved.
