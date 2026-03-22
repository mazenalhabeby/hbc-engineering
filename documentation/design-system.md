# Design System

## Brand Identity

| Property | Value |
|----------|-------|
| Company Name | HBC Engineering |
| Tagline | Engineering Excellence Since 1994 |
| Logo (SVG) | `/public/hbc-logo.svg` |
| Logo (3D) | `/public/hbc-logo.glb` (GLB format, rendered with Three.js) |
| Domain | hbc-engineering.com |

---

## Fonts

Loaded via `next/font/google` in `app/[locale]/layout.tsx`:

| Font | CSS Variable | Usage | Weights |
|------|-------------|-------|---------|
| Geist | `--font-geist-sans` | Default sans-serif, UI text | Variable |
| Geist Mono | `--font-geist-mono` | Code, monospace text | Variable |
| Manrope | `--font-manrope` | Body text, paragraphs | 300, 400, 500, 600, 700 |
| Orbitron | `--font-orbitron` | Display, branding, headings | 400, 600, 700, 800 |

**Utility classes:**

```css
.font-geist     { font-family: var(--font-geist-sans); }
.font-geist-mono { font-family: var(--font-geist-mono); }
.font-orbitron  { font-family: var(--font-orbitron); }
.font-manrope   { font-family: var(--font-manrope); }
```

---

## Color Palette

Colors are defined using the OKLCH color space in `styles/globals.css` via CSS custom properties.

### Light Mode (`:root`)

| Token | OKLCH Value | Usage |
|-------|-------------|-------|
| `--background` | `oklch(0.9335 0.0287 241.61)` | Page background (light blue-gray) |
| `--foreground` | `oklch(0.145 0 0)` | Main text color (near black) |
| `--primary` | `oklch(0.4591 0.1746 28.34)` | Primary accent (warm/burnt tone) |
| `--primary-foreground` | `oklch(0.985 0 0)` | Text on primary (near white) |
| `--secondary` | `oklch(0.5217 0.1321 246)` | Secondary accent (blue) |
| `--secondary-foreground` | `oklch(0.205 0 0)` | Text on secondary |
| `--muted` | `oklch(0.97 0 0)` | Muted backgrounds |
| `--muted-foreground` | `oklch(0.556 0 0)` | Muted text |
| `--accent` | `oklch(0.97 0 0)` | Accent backgrounds |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Error/destructive actions (red) |
| `--border` | `oklch(0.922 0 0)` | Border color |
| `--input` | `oklch(0.922 0 0)` | Input border |
| `--ring` | `oklch(0.708 0 0)` | Focus ring |
| `--card` | `oklch(1 0 0)` | Card background (white) |
| `--popover` | `oklch(1 0 0)` | Popover background (white) |

### Dark Mode (`.dark`)

| Token | OKLCH Value | Usage |
|-------|-------------|-------|
| `--background` | `oklch(0.145 0 0)` | Dark background |
| `--foreground` | `oklch(0.985 0 0)` | Light text |
| `--card` | `oklch(0.205 0 0)` | Card background |
| `--muted` | `oklch(0.269 0 0)` | Muted dark |
| `--border` | `oklch(1 0 0 / 10%)` | Subtle border |
| `--input` | `oklch(1 0 0 / 15%)` | Input border |

### Chart Colors

| Token | Light | Dark |
|-------|-------|------|
| `--chart-1` | `oklch(0.646 0.222 41.116)` | `oklch(0.488 0.243 264.376)` |
| `--chart-2` | `oklch(0.6 0.118 184.704)` | `oklch(0.696 0.17 162.48)` |
| `--chart-3` | `oklch(0.398 0.07 227.392)` | `oklch(0.769 0.188 70.08)` |
| `--chart-4` | `oklch(0.828 0.189 84.429)` | `oklch(0.627 0.265 303.9)` |
| `--chart-5` | `oklch(0.769 0.188 70.08)` | `oklch(0.645 0.246 16.439)` |

### Brand Colors (used in inline styles)

| Color | Hex | Usage |
|-------|-----|-------|
| HBC Blue Primary | `#066eb0` | CTA gradients, corporate accent |
| HBC Blue Dark | `#0b4da2` | Button gradients |
| HBC Blue Light | `#1664c0` | Button gradient end |
| Dark Navy | `#0f172a` | Email headers, dark sections |
| Slate | `#334155` | Email header gradient end |
| Emerald | `#10b981` | Success states, confirmation emails |
| Purple | `#667eea` | Job application email header |

---

## Border Radius

Base radius: `0.625rem` (10px)

| Token | Calculation | Result |
|-------|------------|--------|
| `--radius-sm` | `calc(var(--radius) - 4px)` | 6px |
| `--radius-md` | `calc(var(--radius) - 2px)` | 8px |
| `--radius-lg` | `var(--radius)` | 10px |
| `--radius-xl` | `calc(var(--radius) + 4px)` | 14px |

---

## Animations

### Custom Keyframes

| Animation | Duration | Usage |
|-----------|----------|-------|
| `appear` | 700ms cubic-bezier(0.16, 1, 0.3, 1) | Page element entrance |
| `nf-appear` | 600ms cubic-bezier(0.16, 1, 0.3, 1) | 404 page entrance |
| `btn-pulse` | 3s infinite | CTA button glow pulse |
| `aurora-drift-1` through `aurora-drift-5` | Various | Background blob movement |
| `aurora-shimmer` | Continuous | Background shimmer effect |

### Utility Classes

```css
.animate-appear { animation: appear 700ms cubic-bezier(0.16, 1, 0.3, 1) both; }
```

### Framer Motion

Used throughout for:
- Page transitions
- Scroll-triggered animations
- Hover effects
- Staggered children animations
- Parallax effects

### Lenis Smooth Scrolling

Provided by `LenisProvider` wrapping all page content. Enables buttery-smooth scroll behavior across the entire site.

---

## Component Library

### shadcn/ui Components

Configuration from `components.json`:
- **Style:** New York
- **Base Color:** Neutral
- **Icon Library:** Lucide
- **CSS Variables:** Enabled
- **RSC Support:** Yes

| Component | File | Radix Primitive |
|-----------|------|----------------|
| Button | `components/ui/button.tsx` | Slot |
| Dialog | `components/ui/dialog.tsx` | Dialog |
| Accordion | `components/ui/accordion.tsx` | Accordion |
| Select | `components/ui/select.tsx` | Select |
| Input | `components/ui/input.tsx` | -- |
| Textarea | `components/ui/textarea.tsx` | -- |
| Checkbox | `components/ui/checkbox.tsx` | Checkbox |
| Separator | `components/ui/separator.tsx` | Separator |
| Label | (via Radix) | Label |
| Command | `components/ui/command.tsx` | cmdk |

### Custom Components

| Component | File | Description |
|-----------|------|-------------|
| AuroraBackground | `components/ui/AuroraBackground.tsx` | Animated gradient blob background |
| BackgroundBoxes | `components/ui/background-boxes.tsx` | CSS grid with hover color effect |
| Hero | `components/ui/Hero.tsx` | Reusable hero section |
| CTA | `components/ui/CTA.tsx` | Call-to-action block |
| FaqAccordion | `components/ui/FaqAccordion.tsx` | FAQ accordion section |
| Timeline | `components/ui/timeline.tsx` | Vertical timeline |
| AppleCardsCarousel | `components/ui/apple-cards-carousel.tsx` | Apple-style horizontal carousel |
| GlassCard | `components/GlassCard.tsx` | Glassmorphism card |
| TiltCard | `components/TiltCard.tsx` | 3D tilt-on-hover card |
| GradientBlobs | `components/GradientBlobs.tsx` | Animated gradient background |
| InfoGrid | `components/InfoGrid.tsx` | Information grid layout |
| Marquee | `components/Marquee.tsx` | Scrolling text marquee |
| ChipKinetic | `components/ChipKinetic.tsx` | Animated chip/tag |
| DynamicAccordion | `components/DynamicAccordion.tsx` | Dynamic accordion sections |

---

## Navbar Design

The navbar uses a glassmorphism design:

- **Desktop:** Pill-shaped glass bar with frosted background
- **Mobile:** Full-height slide-in drawer with portal rendering
- **Scroll behavior:** Transparent at top, blurred glass on scroll
- **Glass effect:** `backdrop-blur-xl bg-[rgb(246_249_255/0.55)]`
- **Border:** `border-white/20` on scroll

---

## Loader

`HBCGrandLoaderFull` displays a branded splash screen on initial page load:

- Minimum display time: 500ms
- Reveal direction: configurable (`top-left`, `top-right`, `bottom-left`, `bottom-right`)
- Shows "HBC Engineering" title
- Subtitle: "Preparing your experience..."

---

## Icons

Two icon libraries are available:

| Library | Import | Usage |
|---------|--------|-------|
| Lucide React | `import { Icon } from 'lucide-react'` | Primary icon set (shadcn/ui default) |
| Tabler Icons | `import { Icon } from '@tabler/icons-react'` | Secondary/additional icons |

Custom SVG icons are defined in `components/Icons.tsx`.
