# Database Setup

## Why PostgreSQL

Для e-commerce реляційна БД підходить краще за in-memory storage, бо в нас є пов'язані сутності:

- users
- products
- carts
- orders
- order_items

На першому кроці ми переносимо лише `users`, щоб auth flow працював через реальну БД.

## Stack

- PostgreSQL in Docker
- Prisma ORM
- Express API

## What Was Added

- [docker-compose.yml](c:/Users/Vitaliy/Desktop/Testing/VisualStudioProjects/E-commerce/docker-compose.yml) для локального Postgres
- [apps/server/prisma/schema.prisma](c:/Users/Vitaliy/Desktop/Testing/VisualStudioProjects/E-commerce/apps/server/prisma/schema.prisma) з моделлю `User`
- [apps/server/src/db.js](c:/Users/Vitaliy/Desktop/Testing/VisualStudioProjects/E-commerce/apps/server/src/db.js) для Prisma client

## User Table Design

- `id`: UUID primary key
- `email`: unique, зберігається в lowercase
- `password_hash`: hashed password
- `created_at`: timestamp created automatically

## Why Lowercase Email

Case-insensitive uniqueness можна реалізувати різними способами, але для старту найпростіше і надійно:

- перед збереженням приводити email до lowercase
- шукати користувача теж по lowercase
- у БД тримати тільки normalized value

Тоді `Test@gmail.com` і `test@gmail.com` стають одним і тим самим значенням.

## Commands

```bash
docker compose up -d
npm.cmd install
npm.cmd run prisma:generate --workspace server
npm.cmd run prisma:push --workspace server
npm.cmd run dev:server
npm.cmd run dev:client
```
