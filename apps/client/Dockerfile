FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/client/package.json apps/client/package.json
COPY apps/server/package.json apps/server/package.json

RUN npm ci --include=dev --legacy-peer-deps

COPY apps/client ./apps/client

RUN npm run build --workspace client

FROM caddy:2-alpine

COPY apps/client/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/apps/client/dist /srv
