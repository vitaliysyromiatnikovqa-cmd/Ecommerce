const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*';

const pick = (chars: string): string =>
  chars[Math.floor(Math.random() * chars.length)];

const shuffle = (str: string): string =>
  str
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

// --- Email ---

export const randomEmail = (): string => {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'test.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const name = Math.random().toString(36).substring(2, 10); // напр. "k3f9zx1m"
  return `${name}@${domain}`;
};

// --- Password ---
// Мінімум 8 символів, 1 цифра, 1 символ, 1 велика літера

export const randomPassword = (length: number = 12): string => {
  const minLength = Math.max(length, 8);

  // Гарантуємо обов'язкові символи
  const required = [
    pick(UPPERCASE),
    pick(DIGITS),
    pick(SYMBOLS),
  ];

  // Решта — lowercase щоб пароль був читабельний
  const remaining = Array.from(
    { length: minLength - required.length },
    () => pick(LOWERCASE)
  );

  return shuffle([...required, ...remaining].join(''));
};