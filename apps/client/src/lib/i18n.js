import { createContext, createElement, useContext, useEffect, useMemo, useState } from 'react';

export const DEFAULT_LOCALE = 'en';
export const SUPPORTED_LOCALES = ['en', 'uk'];

const LOCALE_STORAGE_KEY = 'gamereason-locale';

const translations = {
  en: {
    nav: {
      home: 'Home',
      account: 'Account',
      login: 'Login',
      register: 'Register',
      mainNavigation: 'Main navigation',
    },
    language: {
      switcher: 'Language switcher',
      uk: 'UKR',
      en: 'ENG',
    },
    common: {
      brand: 'GameReason',
      signIn: 'Sign In',
      createAccount: 'Create Account',
      backToHome: 'Back to Home',
      backToSignIn: 'Back to Sign In',
      signOut: 'Sign Out',
      deleteAccount: 'Delete Account',
      deletingAccount: 'Deleting account...',
      saveProfile: 'Save Profile',
      savingProfile: 'Saving profile...',
    },
    forgotPassword: {
      openReset: 'Open Reset Password',
    },
    account: {
      deleteModalTitle: 'Delete account?',
      deleteModalDescription:
        'This will permanently remove your GameReason profile and sign you out of the platform.',
      deleteModalCancel: 'Keep my account',
      deleteModalConfirm: 'Yes, delete account',
    },
    validation: {
      fullNameRequired: 'Full Name is required',
      emailRequired: 'Email is required',
      emailMustContainAt: 'Email must contain @',
      invalidEmailFormat: 'Invalid email format',
      forbiddenDomain: 'Registration with this domain is not allowed',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 8 characters long',
      passwordUppercase: 'Password must contain at least one uppercase English letter',
      passwordDigit: 'Password must contain at least one digit',
      passwordSpecial: 'Password must contain at least one special character',
      passwordAllowedChars:
        'Password can contain only English letters, digits, and special characters',
      confirmPasswordRequired: 'Confirm password is required',
      passwordsDoNotMatch: 'Passwords do not match',
      resetTokenRequired: 'Reset token is required',
      termsRequired: 'You must agree to the Terms of Service and Privacy Policy',
      phoneRequired: 'Phone Number is required',
      phoneUkraineFormat: 'Phone Number must use +380XXXXXXXXX format',
    },
    messages: {
      requestFailed: 'Request failed',
      authRequired: 'Authentication required',
      invalidOrExpiredAccessToken: 'Invalid or expired access token',
      userNotFoundForToken: 'User not found for this token',
      forgotPasswordFailed: 'Forgot password failed',
      forgotPasswordSuccess:
        'If an account with this email exists, a reset token has been generated',
      tooManyResetRequests:
        'Too many reset requests. Please wait 30 seconds before trying again.',
      profileUpdateFailed: 'Profile update failed',
      profileUpdatedSuccessfully: 'Profile updated successfully',
      registrationFailed: 'Registration failed',
      userCreatedSuccessfully: 'User created successfully',
      loginFailed: 'Login failed',
      invalidEmailOrPassword: 'Invalid email or password',
      loginSuccessful: 'Login successful',
      resetPasswordFailed: 'Reset password failed',
      resetTokenInvalidOrExpired: 'Reset token is invalid or expired',
      passwordResetSuccessful: 'Password reset successful',
      userIdRequired: 'User id is required',
      deleteOwnAccountOnly: 'You can delete only your own account',
      userDeletedSuccessfully: 'User deleted successfully',
      userNotFound: 'User not found',
      invalidJsonBody: 'Invalid JSON body',
      internalServerError: 'Internal server error',
    },
  },
  uk: {
    nav: {
      home: 'Головна',
      account: 'Акаунт',
      login: 'Увійти',
      register: 'Реєстрація',
      mainNavigation: 'Головна навігація',
    },
    language: {
      switcher: 'Перемикач мови',
      uk: 'УКР',
      en: 'ENG',
    },
    common: {
      brand: 'GameReason',
      signIn: 'Увійти',
      createAccount: 'Створити акаунт',
      backToHome: 'Назад на головну',
      backToSignIn: 'Назад до входу',
      signOut: 'Вийти',
      deleteAccount: 'Видалити акаунт',
      deletingAccount: 'Видаляємо акаунт...',
      saveProfile: 'Зберегти профіль',
      savingProfile: 'Зберігаємо профіль...',
    },
    forgotPassword: {
      openReset: 'Відкрити скидання пароля',
    },
    account: {
      deleteModalTitle: 'Видалити акаунт?',
      deleteModalDescription:
        'Це назавжди видалить ваш профіль GameReason і виконає вихід із платформи.',
      deleteModalCancel: 'Залишити акаунт',
      deleteModalConfirm: 'Так, видалити акаунт',
    },
    validation: {
      fullNameRequired: "Повне ім'я є обов'язковим",
      emailRequired: "Email є обов'язковим",
      emailMustContainAt: 'Email повинен містити @',
      invalidEmailFormat: 'Некоректний формат email',
      forbiddenDomain: 'Реєстрація з цим доменом недоступна',
      passwordRequired: "Пароль є обов'язковим",
      passwordMinLength: 'Пароль має містити щонайменше 8 символів',
      passwordUppercase:
        'Пароль має містити щонайменше одну велику англійську літеру',
      passwordDigit: 'Пароль має містити щонайменше одну цифру',
      passwordSpecial: 'Пароль має містити щонайменше один спеціальний символ',
      passwordAllowedChars:
        'Пароль може містити лише англійські літери, цифри та спеціальні символи',
      confirmPasswordRequired: "Підтвердження пароля є обов'язковим",
      passwordsDoNotMatch: 'Паролі не збігаються',
      resetTokenRequired: "Токен скидання є обов'язковим",
      termsRequired: 'Потрібно погодитися з Terms of Service і Privacy Policy',
      phoneRequired: "Номер телефону є обов'язковим",
      phoneUkraineFormat: 'Номер телефону має бути у форматі +380XXXXXXXXX',
    },
    messages: {
      requestFailed: 'Запит не виконано',
      authRequired: 'Потрібна автентифікація',
      invalidOrExpiredAccessToken: 'Недійсний або прострочений access token',
      userNotFoundForToken: 'Користувача для цього токена не знайдено',
      forgotPasswordFailed: 'Не вдалося виконати запит на скидання пароля',
      forgotPasswordSuccess:
        'Якщо акаунт із цим email існує, токен для скидання вже згенеровано',
      tooManyResetRequests:
        'Забагато запитів на скидання. Зачекайте 30 секунд перед новою спробою.',
      profileUpdateFailed: 'Не вдалося оновити профіль',
      profileUpdatedSuccessfully: 'Профіль успішно оновлено',
      registrationFailed: 'Не вдалося завершити реєстрацію',
      userCreatedSuccessfully: 'Користувача успішно створено',
      loginFailed: 'Не вдалося виконати вхід',
      invalidEmailOrPassword: 'Невірний email або пароль',
      loginSuccessful: 'Вхід успішний',
      resetPasswordFailed: 'Не вдалося скинути пароль',
      resetTokenInvalidOrExpired: 'Токен скидання недійсний або прострочений',
      passwordResetSuccessful: 'Пароль успішно скинуто',
      userIdRequired: 'Потрібен ідентифікатор користувача',
      deleteOwnAccountOnly: 'Можна видалити лише власний акаунт',
      userDeletedSuccessfully: 'Користувача успішно видалено',
      userNotFound: 'Користувача не знайдено',
      invalidJsonBody: 'Некоректне JSON тіло запиту',
      internalServerError: 'Внутрішня помилка сервера',
    },
  },
};

const rawTextTranslations = {
  uk: {
    'Request failed': 'Запит не виконано',
    'Authentication required': 'Потрібна автентифікація',
    'Invalid or expired access token': 'Недійсний або прострочений access token',
    'User not found for this token': 'Користувача для цього токена не знайдено',
    'Forgot password failed': 'Не вдалося виконати запит на скидання пароля',
    'If an account with this email exists, a reset token has been generated':
      'Якщо акаунт із цим email існує, токен для скидання вже згенеровано',
    'Too many reset requests. Please wait 30 seconds before trying again.':
      'Забагато запитів на скидання. Зачекайте 30 секунд перед новою спробою.',
    'Profile update failed': 'Не вдалося оновити профіль',
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
    'Full Name is required': "Повне ім'я є обов'язковим",
    'Email is required': "Email є обов'язковим",
    'Email must contain @': 'Email повинен містити @',
    'Invalid email format': 'Некоректний формат email',
    'Registration with this domain is not allowed': 'Реєстрація з цим доменом недоступна',
    'Password is required': "Пароль є обов'язковим",
    'Password must be at least 8 characters long': 'Пароль має містити щонайменше 8 символів',
    'Password must contain at least one uppercase English letter':
      'Пароль має містити щонайменше одну велику англійську літеру',
    'Password must contain at least one digit': 'Пароль має містити щонайменше одну цифру',
    'Password must contain at least one special character':
      'Пароль має містити щонайменше один спеціальний символ',
    'Password can contain only English letters, digits, and special characters':
      'Пароль може містити лише англійські літери, цифри та спеціальні символи',
    'Confirm password is required': "Підтвердження пароля є обов'язковим",
    'Passwords do not match': 'Паролі не збігаються',
    'Reset token is required': "Токен скидання є обов'язковим",
    'You must agree to the Terms of Service and Privacy Policy':
      'Потрібно погодитися з Terms of Service і Privacy Policy',
    'Phone Number is required': "Номер телефону є обов'язковим",
    'Phone Number must use +380XXXXXXXXX format':
      'Номер телефону має бути у форматі +380XXXXXXXXX',
  },
};

const messageKeyByText = new Map([
  ['Request failed', 'messages.requestFailed'],
  ['Authentication required', 'messages.authRequired'],
  ['Invalid or expired access token', 'messages.invalidOrExpiredAccessToken'],
  ['User not found for this token', 'messages.userNotFoundForToken'],
  ['Forgot password failed', 'messages.forgotPasswordFailed'],
  [
    'If an account with this email exists, a reset token has been generated',
    'messages.forgotPasswordSuccess',
  ],
  [
    'Too many reset requests. Please wait 30 seconds before trying again.',
    'messages.tooManyResetRequests',
  ],
  ['Profile update failed', 'messages.profileUpdateFailed'],
  ['Profile updated successfully', 'messages.profileUpdatedSuccessfully'],
  ['Registration failed', 'messages.registrationFailed'],
  ['User created successfully', 'messages.userCreatedSuccessfully'],
  ['Login failed', 'messages.loginFailed'],
  ['Invalid email or password', 'messages.invalidEmailOrPassword'],
  ['Login successful', 'messages.loginSuccessful'],
  ['Reset password failed', 'messages.resetPasswordFailed'],
  ['Reset token is invalid or expired', 'messages.resetTokenInvalidOrExpired'],
  ['Password reset successful', 'messages.passwordResetSuccessful'],
  ['User id is required', 'messages.userIdRequired'],
  ['You can delete only your own account', 'messages.deleteOwnAccountOnly'],
  ['User deleted successfully', 'messages.userDeletedSuccessfully'],
  ['User not found', 'messages.userNotFound'],
  ['Invalid JSON body', 'messages.invalidJsonBody'],
  ['Internal server error', 'messages.internalServerError'],
  ['Full Name is required', 'validation.fullNameRequired'],
  ['Email is required', 'validation.emailRequired'],
  ['Email must contain @', 'validation.emailMustContainAt'],
  ['Invalid email format', 'validation.invalidEmailFormat'],
  ['Registration with this domain is not allowed', 'validation.forbiddenDomain'],
  ['Password is required', 'validation.passwordRequired'],
  ['Password must be at least 8 characters long', 'validation.passwordMinLength'],
  [
    'Password must contain at least one uppercase English letter',
    'validation.passwordUppercase',
  ],
  ['Password must contain at least one digit', 'validation.passwordDigit'],
  ['Password must contain at least one special character', 'validation.passwordSpecial'],
  [
    'Password can contain only English letters, digits, and special characters',
    'validation.passwordAllowedChars',
  ],
  ['Confirm password is required', 'validation.confirmPasswordRequired'],
  ['Passwords do not match', 'validation.passwordsDoNotMatch'],
  ['Reset token is required', 'validation.resetTokenRequired'],
  ['You must agree to the Terms of Service and Privacy Policy', 'validation.termsRequired'],
  ['Phone Number is required', 'validation.phoneRequired'],
  ['Phone Number must use +380XXXXXXXXX format', 'validation.phoneUkraineFormat'],
]);

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
    const value = variables[token];
    return value == null ? '' : String(value);
  });
}

function getTranslation(key, locale = DEFAULT_LOCALE, variables) {
  const dictionary = translations[locale] ?? translations[DEFAULT_LOCALE];
  const fallbackDictionary = translations[DEFAULT_LOCALE];
  const template = getNestedValue(dictionary, key) ?? getNestedValue(fallbackDictionary, key) ?? key;
  return interpolate(template, variables);
}

export function getCurrentLocale() {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return isSupportedLocale(storedLocale) ? storedLocale : DEFAULT_LOCALE;
}

export function translateRawText(text, locale = DEFAULT_LOCALE) {
  if (!text) {
    return text;
  }

  const localeMap = rawTextTranslations[locale] ?? {};
  return localeMap[text] ?? text;
}

export function translateKnownMessage(message, t) {
  if (!message) {
    return '';
  }

  const key = messageKeyByText.get(message);
  return key ? t(key) : message;
}

export function localizeApiError(error, t) {
  const localizedFieldErrors = Object.fromEntries(
    Object.entries(error?.fieldErrors || {}).map(([field, message]) => [
      field,
      translateKnownMessage(message, t),
    ]),
  );

  return {
    message: translateKnownMessage(error?.message || '', t),
    fieldErrors: localizedFieldErrors,
  };
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
      setLocale: (nextLocale) => {
        if (isSupportedLocale(nextLocale)) {
          setLocale(nextLocale);
        }
      },
      t: (key, variables) => getTranslation(key, locale, variables),
      translateText: (text) => translateRawText(text, locale),
    }),
    [locale],
  );

  return createElement(LocaleContext.Provider, { value }, children);
}

export function useI18n() {
  return useContext(LocaleContext);
}
