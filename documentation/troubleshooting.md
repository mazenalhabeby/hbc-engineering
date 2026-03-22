# Troubleshooting

## Infrastructure Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| `npm install` fails | Corrupted cache or lockfile | `npm cache clean --force && rm -rf node_modules package-lock.json && npm install` |
| Port 3000 in use | Another process on the port | `lsof -i :3000` then `kill -9 <PID>` |
| Build fails | TypeScript errors | Run `npm run lint` to identify issues |
| Build OOM | Not enough memory | `NODE_OPTIONS=--max-old-space-size=4096 npm run build` |
| Turbopack crash | Incompatible package | Try without Turbopack: modify `dev` script to `next dev` |
| Module not found | Missing dependency | `npm install` then restart dev server |

## SMTP / Email Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| "Connection timeout" | Firewall blocking port 587 | Check firewall rules, allow outbound 587 |
| "Authentication failed" | Wrong credentials | Verify `SMTP_USER` and `SMTP_PASSWORD` in `.env.local` |
| "Connection refused" | Wrong host or port | Check `SMTP_HOST` (should be `heracles.mxrouting.net`) |
| "ECONNRESET" | SSL/TLS mismatch | For port 587: `SMTP_SECURE=false`. For port 465: `SMTP_SECURE=true` |
| Emails go to spam | Domain reputation | Add SPF/DKIM records, use verified from address |
| No emails received | Wrong recipient | Check `*_RECIPIENT_EMAIL` vars in `.env.local` |
| Attachments missing | File too large or wrong type | Check file size (<10MB) and type (PDF, DOC, DOCX, images, ZIP) |

### Test SMTP Connection

```bash
# Quick connectivity test
telnet heracles.mxrouting.net 587

# If telnet is not available
nc -zv heracles.mxrouting.net 587
```

## API Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| 400 on contact form | Honeypot triggered or missing fields | Ensure `website` field is empty, `name`/`email` filled |
| 400 on application | Missing CV file | CV file is required |
| 400 "consent" error | Checkbox not checked | Ensure consent checkbox is checked |
| 500 on form submit | SMTP error | Check terminal logs for SMTP error details |
| Form submits but no email | SMTP success but wrong recipient | Verify recipient email in `.env.local` |

## Web / Frontend Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| 3D logo not rendering | WebGL not supported | Check browser supports WebGL 2.0, update GPU drivers |
| 3D logo missing | GLB file not found | Verify `/public/hbc-logo.glb` exists |
| Animations janky | Too many concurrent animations | Reduce motion: check `prefers-reduced-motion` support |
| Translations missing | Key not in message file | Add the missing key to all 7 `messages/*.json` files |
| Wrong language shown | Locale not detected | Check URL prefix, clear browser cookies |
| Navbar not visible | Z-index conflict | Navbar is `z-40`, ensure nothing overlaps |
| Mobile menu broken | Portal not mounted | Check `document.body` is available (client-side only) |
| Images not loading | Remote pattern not configured | Add domain to `remotePatterns` in `next.config.ts` |
| Fonts not loading | Network issue | Check DNS prefetch for fonts.googleapis.com |
| 404 on valid page | Locale not recognized | Ensure locale is one of: en, de, fr, it, da, no, nl |

## Deployment Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| GitHub Action fails at SSH | Wrong secrets | Verify `SSH_PRIVATE_KEY`, `SSH_USER`, `SSH_HOST` in repo settings |
| SSH "host key verification" | Server not in known_hosts | The workflow handles this; check `ssh-keyscan` step |
| Deploy script fails | Script not found or not executable | Ensure `/srv/hbc-site/deploy.sh` exists and is `chmod +x` |
| Site down after deploy | Build error on server | SSH in and check logs, run build manually |

---

## Debugging Commands

### Check Dev Server Logs

```bash
# Start with verbose output
npm run dev
# Errors will appear in the terminal
```

### Check Production Build

```bash
npm run build
# TypeScript and build errors will appear
```

### Lint the Codebase

```bash
npm run lint
```

### Bundle Analysis

```bash
ANALYZE=true npm run build
```

### Check Environment Variables

```bash
# Verify .env.local exists and has values
cat .env.local | grep -v PASSWORD
```

### Check Node.js Version

```bash
node --version  # Should be 18+
npm --version   # Should be 9+
```

---

## Full Dev Environment Reset

If everything is broken and you need a clean start:

```bash
# 1. Stop any running processes
pkill -f "next dev" 2>/dev/null

# 2. Remove build artifacts and dependencies
rm -rf .next node_modules

# 3. Clear npm cache
npm cache clean --force

# 4. Reinstall dependencies
npm install

# 5. Verify environment file
cp .env.local.example .env.local
# Edit .env.local with your credentials

# 6. Start fresh
npm run dev
```
