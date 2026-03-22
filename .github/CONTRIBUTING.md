# Contributing to HBC Engineering

## Quick Start

```bash
git clone <REPO_URL>
cd hbc
npm install
cp .env.local.example .env.local
# Edit .env.local with SMTP credentials
npm run dev
```

Open http://localhost:3000

---

## Code Conventions

### Principles

- **TypeScript strict mode** -- no `any` types, all props typed
- **Server Components by default** -- only use `"use client"` when needed (forms, animations, hooks)
- **Tailwind CSS** -- no external CSS files for component styling (globals.css is the exception)
- **shadcn/ui** -- use existing Radix-based components before building custom ones

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Pages | `page.tsx` in route directory | `app/[locale]/contact/page.tsx` |
| Layouts | `layout.tsx` in route directory | `app/[locale]/layout.tsx` |
| API Routes | `route.ts` in api directory | `app/api/contact/route.ts` |
| Components | PascalCase | `ContactForm.tsx`, `GlassCard.tsx` |
| UI Components | lowercase (shadcn convention) | `components/ui/button.tsx` |
| Utilities | camelCase | `lib/utils.ts` |
| Hooks | `use-` prefix, kebab-case | `hooks/use-outside-click.tsx` |
| Translations | locale code | `messages/en.json` |
| Types | PascalCase | `types/shop.ts` |
| Config | camelCase | `config/site.ts` |

### Component Pattern

```typescript
// Server Component (default)
import { useTranslations } from 'next-intl';

export default function MyPage() {
  const t = useTranslations('myPage');
  return <div>{t('title')}</div>;
}

// Client Component (when interactivity needed)
"use client";

import { useState } from 'react';

export default function MyForm() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

### API Response Format

All API routes return JSON:

```typescript
// Success
return NextResponse.json(
  { success: true, message: "...", ...data },
  { status: 200 }
);

// Validation Error
return NextResponse.json(
  { error: "Missing required fields: ..." },
  { status: 400 }
);

// Server Error
return NextResponse.json(
  {
    error: "An unexpected error occurred. Please try again later.",
    details: process.env.NODE_ENV === "development" ? errorMessage : undefined
  },
  { status: 500 }
);
```

### Frontend Conventions

- Use `cn()` from `lib/utils.ts` for conditional classNames
- Use `useTranslations()` for all user-facing text
- Use `next/image` for all images (never raw `<img>`)
- Use `next/link` for internal navigation
- Use `next/font` for fonts (never external `<link>` tags)
- Prefer `dynamic()` imports for heavy components
- Keep animations accessible (respect `prefers-reduced-motion`)

---

## Git Workflow

### Branch Naming

```
feature/short-description    # New features
fix/short-description        # Bug fixes
refactor/short-description   # Code refactoring
docs/short-description       # Documentation changes
```

### Commit Message Format

```
<type>: <short description>

Types:
- add: new feature or page
- update: changes to existing feature
- fix: bug fix
- edit: minor content/style changes
- refactor: code restructuring
- docs: documentation only
```

Examples from the project:
```
add compact HBC Shop button to navbar
update navbar: add Workwear shop button, remove Intelligent Building
fix TypeScript error in FireProtectionBadge transition
add fire-protection.tech floating badge with smooth animations
```

### PR Process

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm run lint` to check for issues
4. Run `npm run build` to verify the build succeeds
5. Push your branch and open a PR
6. Fill out the PR template
7. Request review from a team member
8. Merge after approval (squash or regular merge)
9. Deployment happens automatically on push to `main`

---

## How-To Guides

### Add a New Page

1. Create directory: `app/[locale]/my-page/`
2. Create `page.tsx`:
   ```typescript
   import { useTranslations } from 'next-intl';
   import { setRequestLocale } from 'next-intl/server';

   export default async function MyPage({ params }: { params: Promise<{ locale: string }> }) {
     const { locale } = await params;
     setRequestLocale(locale);
     const t = useTranslations('myPage');

     return <main>{t('title')}</main>;
   }
   ```
3. Add translations to all 7 files in `messages/`:
   ```json
   {
     "myPage": {
       "title": "My Page Title"
     }
   }
   ```
4. Add route to `lib/urls.ts`:
   ```typescript
   myPage: { label: "myPage", href: "/my-page" },
   ```
5. Optionally add to navbar in `components/navbar/Navbar.tsx`

### Add an API Endpoint

1. Create directory: `app/api/my-route/`
2. Create `route.ts`:
   ```typescript
   import { NextRequest, NextResponse } from "next/server";

   export async function POST(request: NextRequest) {
     try {
       const data = await request.json();
       // Validate and process
       return NextResponse.json({ success: true }, { status: 200 });
     } catch (error) {
       return NextResponse.json(
         { error: "An unexpected error occurred." },
         { status: 500 }
       );
     }
   }
   ```

### Add a New Translation Key

1. Decide on the namespace (e.g., `"myPage"`)
2. Add the key to **all 7** message files:
   - `messages/en.json`
   - `messages/de.json`
   - `messages/fr.json`
   - `messages/it.json`
   - `messages/da.json`
   - `messages/no.json`
   - `messages/nl.json`
3. Use in component:
   ```typescript
   const t = useTranslations('myPage');
   return <h1>{t('heading')}</h1>;
   ```

### Add a New Job Listing

1. Edit `app/[locale]/careers/jobsData.ts`
2. Add a new object to the `jobs` array:
   ```typescript
   {
     slug: "my-job-slug",
     title: "Job Title",
     location: "Location",
     type: "Full-Time",
     summary: "Brief description...",
     responsibilities: ["..."],
     qualifications: ["..."],
     benefits: ["..."],
     tags: ["Tag1", "Tag2"],
   }
   ```
3. The job detail and apply pages are generated automatically from the slug

### Add a shadcn/ui Component

```bash
npx shadcn@latest add <component-name>
```

This adds the component to `components/ui/` and installs any required Radix primitives.

---

## Security Checklist Before PR

- [ ] No credentials or secrets in code (use `.env.local`)
- [ ] No `console.log` with sensitive data
- [ ] All user inputs validated server-side
- [ ] File uploads checked for type and size
- [ ] Honeypot fields preserved on public forms
- [ ] No `dangerouslySetInnerHTML` with user input
- [ ] External links have `rel="noopener noreferrer"`
- [ ] Images use `next/image` component
- [ ] New environment variables added to `.env.local.example`
