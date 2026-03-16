FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/client/package.json apps/client/package.json
COPY apps/server/package.json apps/server/package.json

RUN npm ci --include=dev --legacy-peer-deps

COPY apps/client ./apps/client

CMD ["npm", "run", "dev", "--workspace", "client", "--", "--host", "0.0.0.0", "--port", "5173"]
