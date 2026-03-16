# Roadmap

## Architecture Direction

- Frontend: `React + Vite`
- Backend: `Node.js + Express`
- Data: почнемо з in-memory або JSON seed, потім за бажанням підключимо БД
- UI automation: `Playwright`
- API automation: `Playwright API` або `supertest`
- Quality: `ESLint`, `Prettier`, базові `unit/integration/e2e` тести

## MVP Domain

### Entities

- User
- Product
- Cart
- Order

### Main flows

1. User opens catalog
2. User views product details
3. User adds items to cart
4. User places order
5. User reviews previous orders

## Suggested Folder Convention

```text
apps/client/src/
apps/server/src/
tests/api/
tests/e2e/
docs/manual-testing/
```

## Definition Of Done For Each Feature

- бізнес-логіка працює локально;
- є happy path manual checklist;
- є automation хоча б для одного критичного сценарію;
- є негативна перевірка;
- README або docs оновлені.
