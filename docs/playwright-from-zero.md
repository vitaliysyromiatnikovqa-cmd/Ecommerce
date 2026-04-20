# Playwright з нуля для цього проєкту

Цей конспект прив'язаний до `GameReason`, щоб ми вчилися не на абстрактних "todo-app", а на реальному UI з цього репозиторію.

## Що таке Playwright

Playwright це інструмент для UI automation та E2E тестів.

Він уміє:

- відкривати браузер;
- переходити на сторінки;
- знаходити елементи;
- вводити текст і клікати;
- перевіряти, що користувач бачить правильний результат.

## Головна ментальна модель

У Playwright найважливіші 4 сутності:

1. `test`
   Це окремий сценарій.
2. `page`
   Це вкладка браузера.
3. `locator`
   Це спосіб знайти елемент стабільно.
4. `expect`
   Це перевірка очікуваного результату.

Мінімальний приклад:

```js
import { test, expect } from '@playwright/test';

test('home page opens', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.getByRole('heading', { name: 'Level Up Your Gaming Experience' })).toBeVisible();
});
```

## Як думати як автоматизатор

Не пиши тест як "список кліків".

Пиши його як перевірку бізнес-сценарію:

- відкрили сторінку;
- виконали дію;
- перевірили видимий для користувача результат.

Хороший тест відповідає на питання:
"Що саме ми доводимо цим сценарієм?"

## Що вчити по черзі

Для `GameReason` я б ішов так:

1. Навігація і базові перевірки на home page.
2. Локатори: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`.
3. Форми: `fill`, `click`, `check`.
4. Асерти: `toBeVisible`, `toHaveURL`, `toHaveValue`, `toContainText`.
5. Авторизаційні сценарії.
6. Моки API через `page.route()`.
7. Фікстури, test data, Page Object тільки коли вже є 3-5 тестів.

## Які екрани вже підходять для практики

У цьому проєкті вже є хороші навчальні сторінки:

- `/` для навігації і перевірок контенту;
- `/login` для форми входу;
- `/register` для реєстрації;
- `/account` для авторизованих сценаріїв.

## Найважливіше правило локаторів

Починай з локаторів, найближчих до того, як користувач "бачить" сторінку:

1. `getByRole`
2. `getByLabel`
3. `getByPlaceholder`
4. `getByText`
5. CSS/XPath тільки коли справді нема кращого варіанту

Приклади для цього UI:

```js
page.getByRole('link', { name: 'Sign In' });
page.getByRole('button', { name: 'Create Account' });
page.getByPlaceholder('Enter your email');
page.getByRole('heading', { name: 'Welcome Back' });
```

## Перший навчальний сценарій

Мета:
перевірити, що неавторизований користувач може відкрити головну сторінку і перейти на логін.

```js
import { test, expect } from '@playwright/test';

test('guest can open home page and navigate to login', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await expect(page.getByRole('heading', { name: 'Level Up Your Gaming Experience' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();

  await page.getByRole('link', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
});
```

## Як читати цей тест

Тут є 3 блоки:

1. `page.goto(...)`
   Відкрили сторінку.
2. `expect(...)`
   Переконались, що home page справді завантажилась.
3. `click()` + `toHaveURL(...)`
   Виконали дію і перевірили наслідок.

## Другий сценарій для практики

Мета:
перевірити валідацію логіну без бекенда.

Ідея:

- відкрити `/login`;
- натиснути `Sign In`;
- перевірити, що показались помилки валідації.

Заготовка:

```js
import { test, expect } from '@playwright/test';

test('login page shows validation errors for empty form', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page.getByText('Email is required')).toBeVisible();
  await expect(page.getByText('Password is required')).toBeVisible();
});
```

Це хороший приклад, бо тут ми перевіряємо не просто наявність будь-якої помилки, а конкретну поведінку форми.

## Чого не робити на старті

- не вчити одразу Page Object Model;
- не будувати складну абстракцію до появи реальних дублювань;
- не використовувати `waitForTimeout()` замість нормальних локаторів і асертів;
- не писати крихкі CSS-селектори типу `.app > div:nth-child(2) button`.

## Як ми можемо рухатись далі

Найкращий порядок для навчання:

1. Запустити застосунок локально.
2. Поставити `@playwright/test`.
3. Написати перший живий тест на home page.
4. Додати тест на login validation.
5. Потім перейти до моків і авторизації.

## Команди, які знадобляться пізніше

Коли будемо готові підключити Playwright у репозиторій:

```bash
npm install -D @playwright/test
npx playwright install chromium
```

Після цього зазвичай додають:

```bash
npx playwright test
npx playwright test --ui
npx playwright codegen http://localhost:5173
```

## Що я рекомендую як Lesson 1

Lesson 1 для тебе:

- зрозуміти `test`, `page`, `locator`, `expect`;
- написати сценарій "home -> login";
- пояснити вголос, чому саме ці локатори стабільні.

Якщо хочеш, наступним кроком ми можемо вже прямо в цьому проєкті:

1. встановити Playwright;
2. створити `playwright.config`;
3. написати перший реальний тест разом;
4. запустити його і розібрати кожен рядок.
