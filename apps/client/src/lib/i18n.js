import { createContext, createElement, useContext, useEffect, useMemo, useState } from 'react';

export const DEFAULT_LOCALE = 'en';
export const SUPPORTED_LOCALES = ['en', 'uk'];
const LOCALE_STORAGE_KEY = 'gamereason-locale';

const translations = {
  en: {
    app: {
      name: 'GameReason',
      mainNavigation: 'Main navigation',
    },
    nav: {
      home: 'Home',
      account: 'Account',
      login: 'Login',
      register: 'Register',
    },
    locale: {
      english: 'ENG',
      ukrainian: 'UKR',
    },
    common: {
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      signIn: 'Sign In',
      createAccount: 'Create Account',
      forgotPassword: 'Forgot Password',
      backToHome: 'Back to Home',
      backToSignIn: 'Back to Sign In',
      saveProfile: 'Save Profile',
      savingProfile: 'Saving profile...',
      signOut: 'Sign Out',
      deleteAccount: 'Delete Account',
      deletingAccount: 'Deleting account...',
      cancel: 'Cancel',
      confirm: 'Confirm',
    },
    home: {
      previewEnvironment: 'Staging Preview Environment',
      storefront: 'PC Game Storefront',
      title: 'Buy your next favorite game, deluxe edition, or soundtrack in one place.',
      description:
        'GameReason is a digital game marketplace inspired by launcher-style stores, built to grow from auth into catalog, cart, checkout, and personal game library flows.',
      stagingNote:
        'This staging build is used to verify deploy, smoke, and regression flows before anything reaches production.',
      signedInAs: 'Signed in to GameReason as {email}',
      openAccount: 'Open Account',
    },
    login: {
      eyebrow: 'Sign In',
      title: 'Access your GameReason account',
      description:
        'Use your email and password to open your game library and storefront access.',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      submitting: 'Signing in...',
      noAccount: "Don't have an account?",
      noAccountHighlight: 'Create one to start building your library.',
      forgotCopy: 'Forgot your password?',
      forgotHighlight: 'Use the reset flow and get back to your library.',
      sideTitle: 'Welcome back',
      sideDescription:
        'Sign in now to keep your profile, purchases, and future wishlist tied to one GameReason identity.',
    },
    register: {
      eyebrow: 'Register',
      title: 'Create your GameReason account',
      description:
        'Create a profile to buy games, collect editions, and keep your GameReason library in one place.',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Create password',
      confirmPasswordPlaceholder: 'Repeat your password',
      submitting: 'Creating account...',
      existingAccount: 'Already have an account?',
      existingAccountHighlight: 'Sign in and return to the store.',
      sideTitle: 'Start your library',
      sideDescription:
        'Registration supports frontend and backend validation, blocked domains, and duplicate email checks before a new player account is created.',
      goToSignIn: 'Go to Sign In',
      passwordRules: 'Password rules',
      passwordRuleMinLength: 'At least 8 characters',
      passwordRuleUppercase: 'At least 1 uppercase English letter',
      passwordRuleDigit: 'At least 1 digit',
      passwordRuleSpecial: 'At least 1 special character',
      passwordRuleCharset: 'English letters, digits, and special characters only',
    },
    forgotPassword: {
      eyebrow: 'Forgot Password',
      title: 'Request a reset token for your GameReason account',
      description:
        'Enter your email and we will generate a password reset token for local and API testing.',
      emailPlaceholder: 'Enter your email',
      resetTokenLabel: 'Reset token',
      expiresAtLabel: 'Expires at',
      submitting: 'Generating token...',
      submit: 'Generate Reset Token',
      knowToken: 'Already know your token?',
      knowTokenHighlight: 'Go straight to password reset.',
      openReset: 'Open Reset Password',
      sideTitle: 'Rate limited by design',
      sideDescription:
        'You can create up to three reset requests within thirty seconds. The fourth request is blocked with a rate-limit response.',
    },
    resetPassword: {
      eyebrow: 'Reset Password',
      title: 'Set a new password and jump back into GameReason',
      description:
        'Paste the reset token, choose a new password, and the platform will sign you in automatically after a successful reset.',
      token: 'Reset Token',
      tokenPlaceholder: 'Paste your reset token',
      newPassword: 'New Password',
      newPasswordPlaceholder: 'Create your new password',
      confirmNewPassword: 'Confirm New Password',
      confirmNewPasswordPlaceholder: 'Repeat your new password',
      submitting: 'Resetting password...',
      submit: 'Reset Password',
      needToken: 'Need a new token?',
      needTokenHighlight: 'Generate another one from the forgot password page.',
      requestAnother: 'Request Another Token',
      sideTitle: 'Old tokens are invalidated',
      sideDescription:
        'Every new forgot-password request invalidates previous active reset tokens, so only the latest valid token can be used.',
    },
    account: {
      eyebrow: 'Account',
      title: 'Manage your GameReason profile',
      description: 'Update your account email, sign out, or delete your profile from the platform.',
      emailPlaceholder: 'Update your email',
      sideTitle: 'Your identity hub',
      sideDescription:
        'This cabinet is the first player profile area for GameReason. From here we can later grow into wishlist, order history, and game library sections.',
      deleteModalTitle: 'Delete account?',
      deleteModalDescription:
        'This will permanently remove your GameReason profile and sign you out of the platform.',
      deleteConfirm: 'Yes, delete account',
      deleteCancel: 'Keep my account',
    },
  },
  uk: {
    app: {
      name: 'GameReason',
      mainNavigation: 'Основна навігація',
    },
    nav: {
      home: 'Головна',
      account: 'Акаунт',
      login: 'Увійти',
      register: 'Реєстрація',
    },
    locale: {
      english: 'ENG',
      ukrainian: 'УКР',
    },
    common: {
      email: 'Email',
      password: 'Пароль',
      confirmPassword: 'Підтвердження пароля',
      signIn: 'Увійти',
      createAccount: 'Створити акаунт',
      forgotPassword: 'Забули пароль',
      backToHome: 'Назад на головну',
      backToSignIn: 'Назад до входу',
      saveProfile: 'Зберегти профіль',
      savingProfile: 'Збереження профілю...',
      signOut: 'Вийти',
      deleteAccount: 'Видалити акаунт',
      deletingAccount: 'Видалення акаунта...',
      cancel: 'Скасувати',
      confirm: 'Підтвердити',
    },
    home: {
      previewEnvironment: 'Тестове staging-середовище',
      storefront: 'Магазин PC-ігор',
      title: 'Купуйте улюблені ігри, deluxe-видання та саундтреки в одному місці.',
      description:
        'GameReason — це цифровий маркетплейс ігор у стилі launcher-магазинів, який росте від авторизації до каталогу, кошика, checkout та персональної бібліотеки.',
      stagingNote:
        'Ця staging-збірка використовується для перевірки деплою, smoke та regression сценаріїв перед продакшеном.',
      signedInAs: 'Ви увійшли в GameReason як {email}',
      openAccount: 'Відкрити акаунт',
    },
    login: {
      eyebrow: 'Вхід',
      title: 'Увійдіть у свій акаунт GameReason',
      description:
        'Використайте email і пароль, щоб відкрити бібліотеку ігор та доступ до storefront.',
      emailPlaceholder: 'Введіть ваш email',
      passwordPlaceholder: 'Введіть ваш пароль',
      submitting: 'Вхід...',
      noAccount: 'Ще не маєте акаунта?',
      noAccountHighlight: 'Створіть його й почніть збирати свою бібліотеку.',
      forgotCopy: 'Забули пароль?',
      forgotHighlight: 'Скористайтеся відновленням і поверніться до бібліотеки.',
      sideTitle: 'З поверненням',
      sideDescription:
        'Увійдіть зараз, щоб зберігати профіль, покупки та майбутній wishlist в одному акаунті GameReason.',
    },
    register: {
      eyebrow: 'Реєстрація',
      title: 'Створіть свій акаунт GameReason',
      description:
        'Створіть профіль, щоб купувати ігри, збирати видання й тримати всю бібліотеку GameReason в одному місці.',
      emailPlaceholder: 'Введіть ваш email',
      passwordPlaceholder: 'Створіть пароль',
      confirmPasswordPlaceholder: 'Повторіть пароль',
      submitting: 'Створення акаунта...',
      existingAccount: 'Вже маєте акаунт?',
      existingAccountHighlight: 'Увійдіть і поверніться до магазину.',
      sideTitle: 'Почніть збирати бібліотеку',
      sideDescription:
        'Реєстрація підтримує frontend і backend валідацію, заблоковані домени та перевірку дубліката email перед створенням нового профілю.',
      goToSignIn: 'Перейти до входу',
      passwordRules: 'Правила пароля',
      passwordRuleMinLength: 'Щонайменше 8 символів',
      passwordRuleUppercase: 'Щонайменше 1 велика англійська літера',
      passwordRuleDigit: 'Щонайменше 1 цифра',
      passwordRuleSpecial: 'Щонайменше 1 спеціальний символ',
      passwordRuleCharset: 'Лише англійські літери, цифри та спеціальні символи',
    },
    forgotPassword: {
      eyebrow: 'Забули пароль',
      title: 'Запросіть токен скидання для акаунта GameReason',
      description:
        'Введіть email, і ми згенеруємо токен для скидання пароля для локального та API тестування.',
      emailPlaceholder: 'Введіть ваш email',
      resetTokenLabel: 'Токен скидання',
      expiresAtLabel: 'Діє до',
      submitting: 'Генеруємо токен...',
      submit: 'Згенерувати токен скидання',
      knowToken: 'Вже маєте токен?',
      knowTokenHighlight: 'Одразу переходьте до скидання пароля.',
      openReset: 'Відкрити скидання пароля',
      sideTitle: 'Є rate limit',
      sideDescription:
        'Ви можете створити до трьох запитів на скидання за тридцять секунд. Четвертий запит буде заблоковано.',
    },
    resetPassword: {
      eyebrow: 'Скидання пароля',
      title: 'Встановіть новий пароль і повертайтеся в GameReason',
      description:
        'Вставте токен скидання, задайте новий пароль, і платформа автоматично увійде вас після успішного reset.',
      token: 'Токен скидання',
      tokenPlaceholder: 'Вставте токен скидання',
      newPassword: 'Новий пароль',
      newPasswordPlaceholder: 'Створіть новий пароль',
      confirmNewPassword: 'Підтвердження нового пароля',
      confirmNewPasswordPlaceholder: 'Повторіть новий пароль',
      submitting: 'Скидаємо пароль...',
      submit: 'Скинути пароль',
      needToken: 'Потрібен новий токен?',
      needTokenHighlight: 'Згенеруйте його на сторінці забутого пароля.',
      requestAnother: 'Запросити новий токен',
      sideTitle: 'Старі токени анулюються',
      sideDescription:
        'Кожен новий запит на forgot-password анулює попередні активні токени, тому працює лише останній валідний токен.',
    },
    account: {
      eyebrow: 'Акаунт',
      title: 'Керуйте профілем GameReason',
      description: 'Оновлюйте email, виходьте з акаунта або видаляйте профіль з платформи.',
      emailPlaceholder: 'Оновіть ваш email',
      sideTitle: 'Ваш центр ідентичності',
      sideDescription:
        'Це перша версія кабінету користувача в GameReason. Пізніше звідси можна буде вирости у wishlist, історію замовлень та бібліотеку ігор.',
      deleteModalTitle: 'Видалити акаунт?',
      deleteModalDescription:
        'Це назавжди видалить ваш профіль GameReason і виконає вихід із платформи.',
      deleteConfirm: 'Так, видалити акаунт',
      deleteCancel: 'Залишити акаунт',
    },
  },
};

const rawTextTranslations = {
  uk: {
    'Request failed': 'Запит завершився помилкою',
    'Authentication required': 'Потрібна автентифікація',
    'Invalid or expired access token': 'Недійсний або прострочений токен доступу',
    'User not found for this token': 'Користувача для цього токена не знайдено',
    'Forgot password failed': 'Не вдалося виконати запит на скидання пароля',
    'If an account with this email exists, a reset token has been generated':
      'Якщо акаунт з таким email існує, токен для скидання вже згенеровано',
    'Too many reset requests. Please wait 30 seconds before trying again.':
      'Занадто багато запитів на скидання. Зачекайте 30 секунд перед новою спробою.',
    'Profile update failed': 'Не вдалося оновити профіль',
    'This email is already registered': 'Цей email вже зареєстрований',
    'Profile updated successfully': 'Профіль успішно оновлено',
    'Registration failed': 'Не вдалося завершити реєстрацію',
    'User created successfully': 'Користувача успішно створено',
    'Login failed': 'Не вдалося виконати вхід',
    'Invalid email or password': 'Невірний email або пароль',
    'Login successful': 'Вхід успішний',
    'Reset password failed': 'Не вдалося скинути пароль',
    'Reset token is invalid or expired': 'Токен скидання недійсний або прострочений',
    'Password reset successful': 'Пароль успішно скинуто',
    'User id is required': 'Потрібен ідентифікатор користувача',
    'You can delete only your own account': 'Можна видалити лише власний акаунт',
    'User deleted successfully': 'Користувача успішно видалено',
    'User not found': 'Користувача не знайдено',
    'Invalid JSON body': 'Некоректне JSON тіло запиту',
    'Internal server error': 'Внутрішня помилка сервера',
    'Email is required': 'Email є обовʼязковим',
    'Email must contain @': 'Email повинен містити @',
    'Invalid email format': 'Некоректний формат email',
    'Registration with this domain is not allowed': 'Реєстрація з цим доменом не дозволена',
    'Password is required': 'Пароль є обовʼязковим',
    'Password must be at least 8 characters long': 'Пароль має містити щонайменше 8 символів',
    'Password must contain at least one uppercase English letter':
      'Пароль має містити щонайменше одну велику англійську літеру',
    'Password must contain at least one digit': 'Пароль має містити щонайменше одну цифру',
    'Password must contain at least one special character':
      'Пароль має містити щонайменше один спеціальний символ',
    'Password can contain only English letters, digits, and special characters':
      'Пароль може містити лише англійські літери, цифри та спеціальні символи',
    'Confirm password is required': 'Підтвердження пароля є обовʼязковим',
    'Passwords do not match': 'Паролі не збігаються',
    'Reset token is required': 'Токен скидання є обовʼязковим',
    'Email must be a string': 'Email має бути рядком',
    'Password must be a string': 'Пароль має бути рядком',
    'Confirm password must be a string': 'Підтвердження пароля має бути рядком',
  },
};

const LocaleContext = createContext({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key) => key,
  translateText: (text) => text,
});

function isSupportedLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale);
}

function getNestedValue(object, path) {
  return path.split('.').reduce((current, segment) => current?.[segment], object);
}

function interpolate(template, variables) {
  if (typeof template !== 'string' || !variables) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_match, token) => {
    if (variables[token] === undefined || variables[token] === null) {
      return '';
    }

    return String(variables[token]);
  });
}

export function getCurrentLocale() {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return isSupportedLocale(storedLocale) ? storedLocale : DEFAULT_LOCALE;
}

export function translateText(key, locale = DEFAULT_LOCALE, variables) {
  const dictionary = translations[locale] ?? translations[DEFAULT_LOCALE];
  const fallbackDictionary = translations[DEFAULT_LOCALE];
  const template = getNestedValue(dictionary, key) ?? getNestedValue(fallbackDictionary, key) ?? key;
  return interpolate(template, variables);
}

export function translateRawText(text, locale = DEFAULT_LOCALE) {
  if (!text) {
    return text;
  }

  const localeMap = rawTextTranslations[locale] ?? {};
  return localeMap[text] ?? text;
}

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(getCurrentLocale);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }

    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key, variables) => translateText(key, locale, variables),
      translateText: (text) => translateRawText(text, locale),
    }),
    [locale],
  );

  return createElement(LocaleContext.Provider, { value }, children);
}

export function useI18n() {
  return useContext(LocaleContext);
}
