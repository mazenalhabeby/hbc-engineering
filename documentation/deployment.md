# Deployment

## CI/CD Pipeline

The project uses **GitHub Actions** for automated deployment. The workflow is defined in `.github/workflows/deploy.yml`.

### Trigger

Deployment runs automatically on every push to the `main` branch.

### Pipeline Steps

```
Push to main
     │
     ▼
┌─────────────┐
│  Checkout    │  actions/checkout@v4
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  SSH Agent   │  webfactory/ssh-agent@v0.9.0
│  Setup       │  Uses SSH_PRIVATE_KEY secret
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Trust Host  │  ssh-keyscan adds server to known_hosts
│  Key         │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  SSH Smoke   │  Tests SSH connection with 'echo SSH_OK'
│  Test        │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Deploy      │  Runs /srv/hbc-site/deploy.sh on server
│  Script      │
└─────────────┘
```

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `SSH_PRIVATE_KEY` | SSH private key for server access |
| `SSH_USER` | SSH username on the server |
| `SSH_HOST` | Server hostname or IP |

These must be configured in the repository settings under Settings > Secrets and variables > Actions.

### Deploy Script

The deployment is handled by `/srv/hbc-site/deploy.sh` on the production server. This script typically:
1. Pulls the latest code from the repository
2. Installs dependencies
3. Builds the application
4. Restarts the application server

---

## Production Build

### Build Command

```bash
npm run build
```

This runs `next build --turbopack` and produces a standalone output in `.next/standalone/`.

### Standalone Output

The `next.config.ts` sets `output: 'standalone'`, which creates a self-contained build that includes only the necessary files for production. This means you don't need `node_modules` on the production server -- the standalone output includes all required dependencies.

### Start Command

```bash
npm run start
# or directly:
node .next/standalone/server.js
```

---

## Environment Variables (Production)

All environment variables from `.env.local` must be set on the production server. See [setup-guide.md](./setup-guide.md) for the full list.

### SMTP Configuration

| Variable | Production Value |
|----------|-----------------|
| `SMTP_HOST` | `heracles.mxrouting.net` |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` |
| `SMTP_USER` | *(production email)* |
| `SMTP_PASSWORD` | *(production password)* |

### Email Recipients (Production)

Update all `*_RECIPIENT_EMAIL` variables to use actual production email addresses instead of development test addresses.

### Site URL

```
NEXT_PUBLIC_SITE_URL=https://hbc-engineering.com
```

---

## Image Optimization

Configured in `next.config.ts`:

| Setting | Value |
|---------|-------|
| Formats | AVIF, WebP |
| Device sizes | 640, 750, 828, 1080, 1200, 1920 |
| Image sizes | 16, 32, 48, 64, 96, 128, 256, 384 |
| Cache TTL | 31,536,000 seconds (1 year) |
| Sharp | Installed for production image processing |

### Remote Image Sources

| Domain | Purpose |
|--------|---------|
| `assets.aceternity.com` | UI component assets |
| `images.unsplash.com` | Stock photography |

---

## Caching Strategy

Static assets use aggressive immutable caching (configured in `next.config.ts`):

| Path Pattern | Cache-Control |
|-------------|---------------|
| `/images/*` | `public, max-age=31536000, immutable` |
| `/_next/static/*` | `public, max-age=31536000, immutable` |
| `/_next/image/*` | `public, max-age=31536000, immutable` |
| `/hbc-logo.glb` | `public, max-age=31536000, immutable` |

DNS prefetching is enabled via `X-DNS-Prefetch-Control: on` on all routes.

---

## Performance Optimizations

### Build-Time

- **Turbopack** bundler for faster builds
- **Package import optimization** for: `lucide-react`, `@tabler/icons-react`, `framer-motion`, `motion`, `@react-three/drei`
- **Gzip compression** enabled (`compress: true`)

### Runtime

- **Dynamic imports** for heavy components (FireProtectionBadge, LanguageDialog, page sections)
- **Static params generation** for all locales
- **Standalone output** for smaller deployment footprint
- **Font preloading** via `next/font` with `display: "swap"`
- **3D model preloading** via `<link rel="preload">` for `hbc-logo.glb`

---

## Production Checklist

- [ ] All environment variables set on production server
- [ ] SMTP credentials tested and working
- [ ] Email recipients changed from dev to production addresses
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain
- [ ] SSL certificate configured on the server
- [ ] GitHub Actions secrets configured (SSH_PRIVATE_KEY, SSH_USER, SSH_HOST)
- [ ] Deploy script (`/srv/hbc-site/deploy.sh`) exists and is executable
- [ ] Node.js 18+ installed on production server
- [ ] Firewall allows outbound port 587 (SMTP)
- [ ] DNS configured to point to production server
- [ ] OG image (`/images/og-image.jpg`) exists for social sharing

---

## Bundle Analysis

To analyze the production bundle:

```bash
ANALYZE=true npm run build
```

This generates a visual report of all JavaScript bundles and their sizes.
