Після старту:

фронт: http://localhost:5173
бек: http://localhost:3001/api/health
БД: localhost:5432

# E-commerce Learning Project

Навчальний pet-проєкт для практики `React + Node.js`, ручного тестування та UI/API automation.

## Goal

Побудувати невеликий e-commerce застосунок так, щоб одночасно:

- зрозуміти базову архітектуру магазину;
- пройти повний цикл від UI до API;
- покрити ключові сценарії manual, UI automation та API automation тестами;
- отримати проєкт, який можна показати в портфоліо.

## Planned Structure

```text
apps/
  client/     React frontend
  server/     Node.js backend API
tests/
  api/        API automation
  e2e/        UI automation
docs/         Notes, plans, test artifacts
```

## Product Scope For MVP

Невеликий магазин з такими фічами:

1. Каталог товарів
2. Пошук і фільтрація
3. Сторінка товару
4. Кошик
5. Простий checkout без реальної оплати
6. Авторизація користувача
7. Історія замовлень
8. Адмін-додавання товару як bonus phase

## Testing Strategy

### Manual testing

- smoke checklist;
- regression checklist для MVP;
- exploratory notes;
- bug reports templates.

### API automation

- health check;
- auth flows;
- catalog endpoints;
- cart/order scenarios;
- negative cases.

### UI automation

- login;
- browse catalog;
- add to cart;
- checkout happy path;
- basic validation scenarios.

## Delivery Plan

### Phase 1

- project setup;
- monorepo structure;
- client/server scaffolding;
- first health endpoint and landing page.

### Phase 2

- product catalog;
- shared data model;
- API integration;
- first unit and API tests.

### Phase 3

- auth;
- cart;
- checkout;
- UI e2e flows.

### Phase 4

- manual QA assets;
- reporting;
- CI-ready scripts;
- polish and portfolio cleanup.

## What We Do Next

Найближчий крок:

1. Згенерувати `React` frontend
2. Згенерувати `Node.js` backend
3. Підключити базові тести
4. Реалізувати перший vertical slice: `GET /health` + стартова сторінка

## Local Database Setup

Для реалістичної розробки ми використовуємо `PostgreSQL + Prisma`.

1. Скопіюй [.env.example](c:/Users/Vitaliy/Desktop/Testing/VisualStudioProjects/E-commerce/.env.example) в `.env`
2. Скопіюй [apps/server/.env.example](c:/Users/Vitaliy/Desktop/Testing/VisualStudioProjects/E-commerce/apps/server/.env.example) в `apps/server/.env`
3. Запусти базу: `docker compose up -d`
4. Встанови залежності: `npm.cmd install`
5. Згенеруй Prisma client: `npm.cmd run prisma:generate --workspace server`
6. Створи таблиці: `npm.cmd run prisma:push --workspace server`
7. Запусти backend: `npm.cmd run dev:server`
8. Запусти frontend: `npm.cmd run dev:client`
