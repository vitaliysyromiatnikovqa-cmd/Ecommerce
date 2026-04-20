import { createContext, useContext, useMemo, useState } from 'react';

const LOCALE_STORAGE_KEY = 'gamereason-locale';
const DEFAULT_LOCALE = 'uk';

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
      switcher: 'Language',
      uk: 'UK',
      en: 'EN',
    },
    common: {
      brand: 'GameReason',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      newPassword: 'New Password',
      confirmNewPassword: 'Confirm New Password',
      resetToken: 'Reset Token',
      backToHome: 'Back to Home',
      backToLogin: 'Back to Sign In',
      saveProfile: 'Save Profile',
      savingProfile: 'Saving profile...',
      signOut: 'Sign Out',
      deleteAccount: 'Delete Account',
      deletingAccount: 'Deleting account...',
      copyright: '© 2026 GameReason. All rights reserved.',
    },
    login: {
      eyebrow: 'Sign In',
      title: 'Access your GameReason account',
      description:
        'Use your email and password to open your game library and storefront access.',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      submit: 'Sign In',
      submitting: 'Signing in...',
      footerLead: 'Don’t have an account?',
      footerAccent: 'Create one to start building your library.',
      forgotLead: 'Forgot your password?',
      forgotAccent: 'Use the reset flow and get back to your library.',
      forgotLink: 'Forgot Password',
      sideTitle: 'Welcome back',
      sideDescription:
        'Sign in now to keep your profile, purchases, and future wishlist tied to one GameReason identity.',
      sideCta: 'Create Account',
    },
    register: {
      eyebrow: 'Register',
      title: 'Create your GameReason account',
      description:
        'Create a profile to buy games, collect editions, and keep your GameReason library in one place.',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Create your password',
      confirmPasswordPlaceholder: 'Repeat your password',
      submit: 'Create Account',
      submitting: 'Creating account...',
      footerLead: 'Already have an account?',
      footerAccent: 'Sign in and return to the store.',
      sideTitle: 'Start your library',
      sideDescription:
        'Registration supports frontend and backend validation, blocked domains, and duplicate email checks before a new player account is created.',
      sideCta: 'Go to Sign In',
    },
    forgotPassword: {
      eyebrow: 'Forgot Password',
      title: 'Request a reset token for your GameReason account',
      description:
        'Enter your email and we will generate a password reset token for local and API testing.',
      submit: 'Generate Reset Token',
      submitting: 'Generating token...',
      tokenLabel: 'Reset token',
      expiresAt: 'Expires at',
      footerLead: 'Already know your token?',
      footerAccent: 'Go straight to password reset.',
      openReset: 'Open Reset Password',
      sideTitle: 'Rate limited by design',
      sideDescription:
        'You can create up to three reset requests within thirty seconds. The fourth request is blocked with a rate-limit response.',
      sideCta: 'Back to Sign In',
    },
    resetPassword: {
      eyebrow: 'Reset Password',
      title: 'Set a new password and jump back into GameReason',
      description:
        'Paste the reset token, choose a new password, and the platform will sign you in automatically after a successful reset.',
      tokenPlaceholder: 'Paste your reset token',
      passwordPlaceholder: 'Create your new password',
      confirmPasswordPlaceholder: 'Repeat your new password',
      submit: 'Reset Password',
      submitting: 'Resetting password...',
      footerLead: 'Need a new token?',
      footerAccent: 'Generate another one from the forgot password page.',
      footerCta: 'Request Another Token',
      sideTitle: 'Old tokens are invalidated',
      sideDescription:
        'Every new forgot-password request invalidates previous active reset tokens, so only the latest valid token can be used.',
      sideCta: 'Back to Sign In',
    },
    home: {
      stagingEyebrow: 'Staging Preview Environment',
      storefrontEyebrow: 'PC Game Storefront',
      title: 'Buy your next favorite game, deluxe edition, or soundtrack in one place.',
      description:
        'GameReason is a digital game marketplace inspired by launcher-style stores, built to grow from auth into catalog, cart, checkout, and personal game library flows.',
      stagingDescription:
        'This staging build is used to verify deploy, smoke, and regression flows before anything reaches production.',
      signedInPrefix: 'Signed in to GameReason as',
      openAccount: 'Open Account',
      signIn: 'Sign In',
      createAccount: 'Create Account',
    },
    account: {
      eyebrow: 'Account',
      title: 'Manage your GameReason profile',
      description:
        'Update your account email, sign out, or delete your profile from the platform.',
      emailPlaceholder: 'Update your email',
      sideTitle: 'Your identity hub',
      sideDescription:
        'This cabinet is the first player profile area for GameReason. From here we can later grow into wishlist, order history, and game library sections.',
      deleteModalTitle: 'Delete account?',
      deleteModalDescription:
        'This action permanently removes your GameReason profile and signs you out immediately.',
      deleteModalConfirm: 'Yes, delete account',
      deleteModalCancel: 'Keep my account',
      deleteConfirm:
        'Delete your GameReason account? This will remove your user record and sign you out.',
    },
    validation: {
      emailRequired: 'Email is required',
      emailMustContainAt: 'Email must contain @',
      invalidEmailFormat: 'Invalid email format',
      forbiddenDomain: 'Registration with this domain is not allowed',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 8 characters long',
      passwordUppercase:
        'Password must contain at least one uppercase English letter',
      passwordDigit: 'Password must contain at least one digit',
      passwordSpecial:
        'Password must contain at least one special character',
      passwordAllowedChars:
        'Password can contain only English letters, digits, and special characters',
      confirmPasswordRequired: 'Confirm password is required',
      passwordsDoNotMatch: 'Passwords do not match',
      resetTokenRequired: 'Reset token is required',
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
      switcher: 'Мова',
      uk: 'УКР',
      en: 'ENG',
    },
    common: {
      brand: 'GameReason',
      email: 'Електронна пошта',
      password: 'Пароль',
      confirmPassword: 'Підтвердження пароля',
      newPassword: 'Новий пароль',
      confirmNewPassword: 'Підтвердьте новий пароль',
      resetToken: 'Токен скидання',
      backToHome: 'Повернутися на головну',
      backToLogin: 'Назад до входу',
      saveProfile: 'Зберегти профіль',
      savingProfile: 'Зберігаємо профіль...',
      signOut: 'Вийти',
      deleteAccount: 'Видалити акаунт',
      deletingAccount: 'Видаляємо акаунт...',
      copyright: '© 2026 GameReason. Усі права захищено.',
    },
    login: {
      eyebrow: 'Вхід',
      title: 'Увійдіть у свій акаунт GameReason',
      description:
        'Використайте email і пароль, щоб відкрити доступ до бібліотеки і магазину.',
      emailPlaceholder: 'Введіть ваш email',
      passwordPlaceholder: 'Введіть ваш пароль',
      submit: 'Увійти',
      submitting: 'Виконуємо вхід...',
      footerLead: 'Ще не маєте акаунта?',
      footerAccent: 'Створіть його та почніть збирати свою бібліотеку.',
      forgotLead: 'Забули пароль?',
      forgotAccent: 'Скористайтеся відновленням і поверніться до своєї бібліотеки.',
      forgotLink: 'Забули пароль',
      sideTitle: 'З поверненням',
      sideDescription:
        'Увійдіть зараз, щоб зберегти профіль, покупки та майбутній wishlist в одному GameReason-акаунті.',
      sideCta: 'Створити акаунт',
    },
    register: {
      eyebrow: 'Реєстрація',
      title: 'Створіть акаунт GameReason',
      description:
        'Створіть профіль, щоб купувати ігри, колекціонувати видання та зберігати свою бібліотеку GameReason в одному місці.',
      emailPlaceholder: 'Введіть ваш email',
      passwordPlaceholder: 'Створіть пароль',
      confirmPasswordPlaceholder: 'Повторіть пароль',
      submit: 'Створити акаунт',
      submitting: 'Створюємо акаунт...',
      footerLead: 'Вже маєте акаунт?',
      footerAccent: 'Увійдіть і поверніться до магазину.',
      sideTitle: 'Почніть збирати бібліотеку',
      sideDescription:
        'Реєстрація підтримує frontend- і backend-валідацію, блокування доменів та перевірку дубльованих email перед створенням нового акаунта.',
      sideCta: 'Перейти до входу',
    },
    forgotPassword: {
      eyebrow: 'Забули пароль',
      title: 'Запросіть токен скидання для акаунта GameReason',
      description:
        'Введіть ваш email, і ми згенеруємо токен скидання пароля для локального та API тестування.',
      submit: 'Згенерувати токен',
      submitting: 'Генеруємо токен...',
      tokenLabel: 'Токен скидання',
      expiresAt: 'Діє до',
      footerLead: 'Вже маєте токен?',
      footerAccent: 'Одразу переходьте до скидання пароля.',
      openReset: 'Відкрити скидання пароля',
      sideTitle: 'Є ліміт на запити',
      sideDescription:
        'Можна створити до трьох запитів на скидання протягом тридцяти секунд. Четвертий запит блокується rate-limit відповіддю.',
      sideCta: 'Назад до входу',
    },
    resetPassword: {
      eyebrow: 'Скидання пароля',
      title: 'Встановіть новий пароль і поверніться в GameReason',
      description:
        'Вставте токен скидання, задайте новий пароль, і після успішного скидання система автоматично виконає вхід.',
      tokenPlaceholder: 'Вставте ваш токен скидання',
      passwordPlaceholder: 'Створіть новий пароль',
      confirmPasswordPlaceholder: 'Повторіть новий пароль',
      submit: 'Скинути пароль',
      submitting: 'Скидаємо пароль...',
      footerLead: 'Потрібен новий токен?',
      footerAccent: 'Згенеруйте ще один на сторінці відновлення пароля.',
      footerCta: 'Запросити новий токен',
      sideTitle: 'Старі токени стають недійсними',
      sideDescription:
        'Кожен новий запит на відновлення інвалідовує попередні активні токени, тому працює лише останній дійсний токен.',
      sideCta: 'Назад до входу',
    },
    home: {
      stagingEyebrow: 'Staging-середовище',
      storefrontEyebrow: 'Магазин ПК-ігор',
      title: 'Купуйте улюблені ігри, deluxe-видання чи саундтреки в одному місці.',
      description:
        'GameReason — це цифровий маркетплейс ігор у стилі launcher-store, який росте від auth до каталогу, кошика, checkout і персональної бібліотеки.',
      stagingDescription:
        'Цей staging-білд використовується для перевірки deploy, smoke та regression сценаріїв перед релізом у production.',
      signedInPrefix: 'Ви увійшли в GameReason як',
      openAccount: 'Відкрити акаунт',
      signIn: 'Увійти',
      createAccount: 'Створити акаунт',
    },
    account: {
      eyebrow: 'Акаунт',
      title: 'Керуйте профілем GameReason',
      description:
        'Оновлюйте email акаунта, виходьте із системи або видаляйте профіль із платформи.',
      emailPlaceholder: 'Оновіть ваш email',
      sideTitle: 'Ваш центр ідентичності',
      sideDescription:
        'Це перший профільний кабінет гравця в GameReason. Звідси ми згодом зможемо вирости в wishlist, історію замовлень і бібліотеку ігор.',
      deleteConfirm:
        'Видалити ваш акаунт GameReason? Це прибере запис користувача та виконає вихід із системи.',
    },
    validation: {
      emailRequired: 'Email є обов’язковим',
      emailMustContainAt: 'Email має містити символ @',
      invalidEmailFormat: 'Невірний формат email',
      forbiddenDomain: 'Реєстрація з цим доменом недоступна',
      passwordRequired: 'Пароль є обов’язковим',
      passwordMinLength: 'Пароль має містити щонайменше 8 символів',
      passwordUppercase:
        'Пароль має містити хоча б одну велику англійську літеру',
      passwordDigit: 'Пароль має містити хоча б одну цифру',
      passwordSpecial:
        'Пароль має містити хоча б один спеціальний символ',
      passwordAllowedChars:
        'Пароль може містити лише англійські літери, цифри та спеціальні символи',
      confirmPasswordRequired: 'Підтвердження пароля є обов’язковим',
      passwordsDoNotMatch: 'Паролі не збігаються',
      resetTokenRequired: 'Токен скидання є обов’язковим',
    },
    messages: {
      requestFailed: 'Запит не виконано',
      authRequired: 'Потрібна автентифікація',
      invalidOrExpiredAccessToken: 'Невірний або прострочений access token',
      userNotFoundForToken: 'Користувача для цього токена не знайдено',
      forgotPasswordFailed: 'Не вдалося виконати запит на скидання пароля',
      forgotPasswordSuccess:
        'Якщо акаунт із цим email існує, токен скидання було згенеровано',
      tooManyResetRequests:
        'Забагато запитів на скидання. Зачекайте 30 секунд перед наступною спробою.',
      profileUpdateFailed: 'Не вдалося оновити профіль',
      profileUpdatedSuccessfully: 'Профіль успішно оновлено',
      registrationFailed: 'Реєстрація не вдалася',
      userCreatedSuccessfully: 'Користувача успішно створено',
      loginFailed: 'Не вдалося виконати вхід',
      invalidEmailOrPassword: 'Невірний email або пароль',
      loginSuccessful: 'Вхід виконано успішно',
      resetPasswordFailed: 'Не вдалося скинути пароль',
      passwordResetSuccessful: 'Пароль успішно скинуто',
      userIdRequired: 'Потрібен id користувача',
      deleteOwnAccountOnly: 'Видаляти можна лише власний акаунт',
      userDeletedSuccessfully: 'Користувача успішно видалено',
      userNotFound: 'Користувача не знайдено',
      invalidJsonBody: 'Невірне JSON тіло запиту',
      internalServerError: 'Внутрішня помилка сервера',
    },
  },
};

const messageKeyByText = new Map([
  ['Request failed', 'messages.requestFailed'],
  ['Authentication required', 'messages.authRequired'],
  ['Invalid or expired access token', 'messages.invalidOrExpiredAccessToken'],
  ['User not found for this token', 'messages.userNotFoundForToken'],
  ['Forgot password failed', 'messages.forgotPasswordFailed'],
  ['If an account with this email exists, a reset token has been generated', 'messages.forgotPasswordSuccess'],
  ['Too many reset requests. Please wait 30 seconds before trying again.', 'messages.tooManyResetRequests'],
  ['Profile update failed', 'messages.profileUpdateFailed'],
  ['Profile updated successfully', 'messages.profileUpdatedSuccessfully'],
  ['Registration failed', 'messages.registrationFailed'],
  ['User created successfully', 'messages.userCreatedSuccessfully'],
  ['Login failed', 'messages.loginFailed'],
  ['Invalid email or password', 'messages.invalidEmailOrPassword'],
  ['Login successful', 'messages.loginSuccessful'],
  ['Reset password failed', 'messages.resetPasswordFailed'],
  ['Password reset successful', 'messages.passwordResetSuccessful'],
  ['User id is required', 'messages.userIdRequired'],
  ['You can delete only your own account', 'messages.deleteOwnAccountOnly'],
  ['User deleted successfully', 'messages.userDeletedSuccessfully'],
  ['User not found', 'messages.userNotFound'],
  ['Invalid JSON body', 'messages.invalidJsonBody'],
  ['Internal server error', 'messages.internalServerError'],
  ['Email is required', 'validation.emailRequired'],
  ['Email must contain @', 'validation.emailMustContainAt'],
  ['Invalid email format', 'validation.invalidEmailFormat'],
  ['Registration with this domain is not allowed', 'validation.forbiddenDomain'],
  ['Password is required', 'validation.passwordRequired'],
  ['Password must be at least 8 characters long', 'validation.passwordMinLength'],
  ['Password must contain at least one uppercase English letter', 'validation.passwordUppercase'],
  ['Password must contain at least one digit', 'validation.passwordDigit'],
  ['Password must contain at least one special character', 'validation.passwordSpecial'],
  ['Password can contain only English letters, digits, and special characters', 'validation.passwordAllowedChars'],
  ['Confirm password is required', 'validation.confirmPasswordRequired'],
  ['Passwords do not match', 'validation.passwordsDoNotMatch'],
  ['Reset token is required', 'validation.resetTokenRequired'],
]);

const I18nContext = createContext(null);

function getByPath(target, path) {
  return path.split('.').reduce((current, key) => current?.[key], target);
}

function interpolate(template, variables) {
  if (!variables) {
    return template;
  }

  return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    const value = variables[key.trim()];
    return value == null ? '' : String(value);
  });
}

function getInitialLocale() {
  const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (savedLocale === 'uk' || savedLocale === 'en') {
    return savedLocale;
  }

  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(getInitialLocale);

  const value = useMemo(() => {
    function t(path, variables) {
      const localized = getByPath(translations[locale], path);
      const fallback = getByPath(translations.en, path);
      const resolved = localized ?? fallback ?? path;
      return typeof resolved === 'string' ? interpolate(resolved, variables) : path;
    }

    function changeLocale(nextLocale) {
      if (nextLocale !== 'uk' && nextLocale !== 'en') {
        return;
      }

      window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
      setLocale(nextLocale);
    }

    return {
      locale,
      setLocale: changeLocale,
      t,
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }

  return context;
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
