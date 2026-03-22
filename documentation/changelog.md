# Changelog

Implementation history ordered newest to oldest.

---

## 2025-02-22 - UI Refinements

- Edited performance settings ("prefurmice")
- Updated navbar: added Workwear shop button (links to 8bc.store), removed Intelligent Building from main nav
- Added compact HBC Shop button to navbar for both desktop and mobile
- Reverted background boxes grid to original 150x100 configuration
- Increased background boxes grid for better visibility

## 2025-02 - Performance Optimizations

- Major performance optimizations across the application
- Fixed TypeScript bugs and animation issues
- Optimized bundle size with dynamic imports
- Package import optimization for large libraries (lucide-react, tabler/icons, framer-motion, drei)

## 2025-02 - Fire Protection Badge

- Added floating fire-protection.tech badge with smooth animations
- Fixed TypeScript error in FireProtectionBadge transition
- Edited fire protection link in navbar
- Dynamic import for the badge component (code-splitting)

## 2025-01 - Email System & Branding

- Updated email templates and logo assets
- Configured dual-email system for all form endpoints
- Styled HTML email templates with gradient headers
- Added Reply-To headers for easy reply to senders

## 2025-01 - Careers Application System

- Built multi-step job application form
- Implemented file upload with drag-and-drop (CV + additional files)
- Created 3 job listings: Industrial Electrician, Mechanic, Programmer
- Added job detail pages with responsibilities, qualifications, benefits
- Integrated Nodemailer SMTP for application submission
- Built HR notification emails with file attachments
- Built applicant confirmation emails with next-steps timeline
- Created "Thank You" confirmation page with application ID
- Added application form validation with Zod schemas
- Created CAREERS_SETUP.md and CAREERS_BEST_PRACTICES.md documentation
- Edited the apply page flow and UX

## 2025-01 - Loading & Error Pages

- Created custom branded loading animation (HBCGrandLoaderFull)
- Minimum 500ms display with configurable reveal direction
- Added custom 404 page with animations and navigation
- Fixed 404 routing bug

## 2025-01 - Internationalization (i18n)

- Added next-intl integration with 7 languages
- Created translation files for: English, German, French, Italian, Danish, Norwegian, Dutch
- Translated home page content across all languages
- Translated preloading/loader text
- Extended translations to all service pages
- Implemented locale-aware routing with `as-needed` prefix strategy
- Added language switcher dialog in navbar

## 2025-01 - IT Solutions Page

- Created IT Solutions service page
- Built 6-step multi-page client form (ClientForm.tsx)
- Added service categories: Software, Cloud/DevOps, AI, Security, Data, Web3
- Implemented capabilities grid and FAQ accordion
- Added Zod-validated contact form

## 2025-01 - Core Pages & Features

- Built home page with animated hero, core services, about, values sections
- Created Industrial Maintenance page with pinned showcase
- Created Fire Protection service page
- Created Intelligent Building service page
- Created Company/About page with timeline and team showcase
- Created Contact page with service selection form
- Created Corporate/Meeting Request page with scheduling form
- Created Privacy Policy page
- Built newsletter subscription system in footer

## 2024-12 - Initial Setup & Infrastructure

- Initialized Next.js 15 project with App Router
- Configured TypeScript strict mode
- Set up Tailwind CSS v4 with OKLCH color theme
- Integrated shadcn/ui component library (New York style)
- Set up Three.js + React Three Fiber for 3D logo
- Created glassmorphic navbar with mobile drawer
- Built cinematic footer component
- Set up Lenis smooth scrolling
- Configured MXroute SMTP integration
- Set up GitHub Actions CI/CD pipeline
- Configured standalone output for production deployment
- Created environment variable template (.env.local.example)
- Set up image optimization (AVIF, WebP, Sharp)
- Configured aggressive caching for static assets
