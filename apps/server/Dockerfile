FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/client/package.json apps/client/package.json
COPY apps/server/package.json apps/server/package.json

RUN npm ci --include=dev --legacy-peer-deps

COPY apps/server ./apps/server

CMD ["sh", "-c", "npm run prisma:generate --workspace server && npm run prisma:push --workspace server && npm run start --workspace server"]
