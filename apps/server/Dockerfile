FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/client/package.json apps/client/package.json
COPY apps/server/package.json apps/server/package.json

RUN npm ci --include=dev --legacy-peer-deps

COPY apps/server ./apps/server

COPY apps/server/docker-entrypoint.sh ./apps/server/docker-entrypoint.sh

RUN chmod +x ./apps/server/docker-entrypoint.sh

CMD ["sh", "./apps/server/docker-entrypoint.sh"]
