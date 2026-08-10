FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
# Install prod deps, then force-install the musl/x64 sharp binary BY NAME so Next.js
# image optimization works on Alpine. The lockfile omits the linuxmusl-x64 variant, so
# `npm ci` leaves it out and `npm install sharp` is a no-op; installing the platform
# package directly pulls the matching libvips and makes require("sharp") load.
RUN npm ci --omit=dev \
 && SHARP_VER=$(node -p "require('./node_modules/sharp/package.json').version") \
 && npm install --no-save --include=optional "@img/sharp-linuxmusl-x64@${SHARP_VER}" \
 && node -e "require('sharp'); console.log('sharp loads OK in build')"
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
ENV PORT=3000
EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000"]
