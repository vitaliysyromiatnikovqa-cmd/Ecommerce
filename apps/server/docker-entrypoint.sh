#!/bin/sh
set -eu

npx prisma generate --schema apps/server/prisma/schema.prisma
npx prisma db push --schema apps/server/prisma/schema.prisma

exec npm run start --workspace server
