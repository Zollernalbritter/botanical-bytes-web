# syntax=docker/dockerfile:1

# Produktions-Image für Coolify: Next-Standalone-Server auf Port 3000.

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# --ignore-scripts spart den ffmpeg-static-Download (~80 MB); ffmpeg wird nur
# von den Asset-Skripten gebraucht, nie zur Laufzeit. sharp bringt seine
# Binaries als optionalDependencies mit und braucht kein Install-Skript.
RUN npm ci --ignore-scripts

FROM node:22-alpine AS builder
WORKDIR /app
# sitemap.xml, robots.txt und metadataBase werden beim Build vorgerendert —
# SITE_URL muss deshalb schon hier stimmen, nicht erst zur Laufzeit.
ARG SITE_URL=https://botanicalbytes.tflit.com
ENV SITE_URL=$SITE_URL \
    NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# sharp betreibt die Bildoptimierung von next/image im Produktionsbetrieb.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/sharp ./node_modules/sharp
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@img ./node_modules/@img

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
