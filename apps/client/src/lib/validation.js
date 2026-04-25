const forbiddenDomains = ['ru', 'ail.ru', 'mail.ru', 'yandex.ru', 'bk.ru', 'inbox.ru'];
const passwordAllowedCharacters = /^[A-Za-z\d!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]+$/;

function getTranslator(translateText) {
  return typeof translateText === 'function' ? translateText : (text) => text;
}

function normalizeString(value) {
  return typeof value === 'string' ? value : '';
}

function getDomain(email) {
  return email.split('@')[1]?.toLowerCase() ?? '';
}

function isForbiddenDomain(domain) {
  return domain === 'ru' || domain.endsWith('.ru') || forbiddenDomains.includes(domain);
}

<<<<<<< Updated upstream
function message(t, key, fallback) {
  if (typeof t !== 'function') {
    return fallback;
  }

  const translated = t(key);
  return translated === key ? fallback : translated;
}

export function validateRegisterForm(values, t) {
=======
export function validateRegisterForm(values, translateText) {
  const t = getTranslator(translateText);
>>>>>>> Stashed changes
  const errors = {};
  const fullName = normalizeString(values.fullName).trim();
  const email = normalizeString(values.email).trim();
  const password = normalizeString(values.password);
  const confirmPassword = normalizeString(values.confirmPassword);

  if (!fullName) {
    errors.fullName = message(t, 'validation.fullNameRequired', 'Full Name is required');
  }

  if (!email) {
<<<<<<< Updated upstream
    errors.email = message(t, 'validation.emailRequired', 'Email is required');
  } else if (!email.includes('@')) {
    errors.email = message(t, 'validation.emailMustContainAt', 'Email must contain @');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = message(t, 'validation.invalidEmailFormat', 'Invalid email format');
  } else if (isForbiddenDomain(getDomain(email))) {
    errors.email = message(
      t,
      'validation.forbiddenDomain',
      'Registration with this domain is not allowed',
    );
  }

  if (!password) {
    errors.password = message(t, 'validation.passwordRequired', 'Password is required');
  } else if (password.length < 8) {
    errors.password = message(
      t,
      'validation.passwordMinLength',
      'Password must be at least 8 characters long',
    );
  } else if (!/[A-Z]/.test(password)) {
    errors.password = message(
      t,
      'validation.passwordUppercase',
      'Password must contain at least one uppercase English letter',
    );
  } else if (!/\d/.test(password)) {
    errors.password = message(
      t,
      'validation.passwordDigit',
      'Password must contain at least one digit',
    );
  } else if (!/[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]/.test(password)) {
    errors.password = message(
      t,
      'validation.passwordSpecial',
      'Password must contain at least one special character',
    );
  } else if (!passwordAllowedCharacters.test(password)) {
    errors.password = message(
      t,
      'validation.passwordAllowedChars',
=======
    errors.email = t('Email is required');
  } else if (!email.includes('@')) {
    errors.email = t('Email must contain @');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = t('Invalid email format');
  } else if (isForbiddenDomain(getDomain(email))) {
    errors.email = t('Registration with this domain is not allowed');
  }

  if (!password) {
    errors.password = t('Password is required');
  } else if (password.length < 8) {
    errors.password = t('Password must be at least 8 characters long');
  } else if (!/[A-Z]/.test(password)) {
    errors.password = t('Password must contain at least one uppercase English letter');
  } else if (!/\d/.test(password)) {
    errors.password = t('Password must contain at least one digit');
  } else if (!/[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]/.test(password)) {
    errors.password = t('Password must contain at least one special character');
  } else if (!passwordAllowedCharacters.test(password)) {
    errors.password = t(
>>>>>>> Stashed changes
      'Password can contain only English letters, digits, and special characters',
    );
  }

  if (!confirmPassword) {
<<<<<<< Updated upstream
    errors.confirmPassword = message(
      t,
      'validation.confirmPasswordRequired',
      'Confirm password is required',
    );
  } else if (confirmPassword !== password) {
    errors.confirmPassword = message(
      t,
      'validation.passwordsDoNotMatch',
      'Passwords do not match',
    );
  }

  if (!values.termsAccepted) {
    errors.termsAccepted = message(
      t,
      'validation.termsRequired',
      'You must agree to the Terms of Service and Privacy Policy',
    );
=======
    errors.confirmPassword = t('Confirm password is required');
  } else if (confirmPassword !== password) {
    errors.confirmPassword = t('Passwords do not match');
>>>>>>> Stashed changes
  }

  return errors;
}

<<<<<<< Updated upstream
export function validateLoginForm(values, t) {
=======
export function validateLoginForm(values, translateText) {
  const t = getTranslator(translateText);
>>>>>>> Stashed changes
  const errors = {};
  const email = normalizeString(values.email).trim();
  const password = normalizeString(values.password);

  if (!email) {
<<<<<<< Updated upstream
    errors.email = message(t, 'validation.emailRequired', 'Email is required');
  } else if (!email.includes('@')) {
    errors.email = message(t, 'validation.emailMustContainAt', 'Email must contain @');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = message(t, 'validation.invalidEmailFormat', 'Invalid email format');
  }

  if (!password) {
    errors.password = message(t, 'validation.passwordRequired', 'Password is required');
=======
    errors.email = t('Email is required');
  } else if (!email.includes('@')) {
    errors.email = t('Email must contain @');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = t('Invalid email format');
  }

  if (!password) {
    errors.password = t('Password is required');
>>>>>>> Stashed changes
  }

  return errors;
}

<<<<<<< Updated upstream
export function validateForgotPasswordForm(values, t) {
=======
export function validateForgotPasswordForm(values, translateText) {
  const t = getTranslator(translateText);
>>>>>>> Stashed changes
  const errors = {};
  const email = normalizeString(values.email).trim();

  if (!email) {
<<<<<<< Updated upstream
    errors.email = message(t, 'validation.emailRequired', 'Email is required');
  } else if (!email.includes('@')) {
    errors.email = message(t, 'validation.emailMustContainAt', 'Email must contain @');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = message(t, 'validation.invalidEmailFormat', 'Invalid email format');
=======
    errors.email = t('Email is required');
  } else if (!email.includes('@')) {
    errors.email = t('Email must contain @');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = t('Invalid email format');
>>>>>>> Stashed changes
  }

  return errors;
}

<<<<<<< Updated upstream
export function validateResetPasswordForm(values, t) {
=======
export function validateResetPasswordForm(values, translateText) {
  const t = getTranslator(translateText);
>>>>>>> Stashed changes
  const errors = {};
  const token = normalizeString(values.token).trim();
  const password = normalizeString(values.password);
  const confirmPassword = normalizeString(values.confirmPassword);

  if (!token) {
<<<<<<< Updated upstream
    errors.token = message(t, 'validation.resetTokenRequired', 'Reset token is required');
  }

  if (!password) {
    errors.password = message(t, 'validation.passwordRequired', 'Password is required');
  } else if (password.length < 8) {
    errors.password = message(
      t,
      'validation.passwordMinLength',
      'Password must be at least 8 characters long',
    );
  } else if (!/[A-Z]/.test(password)) {
    errors.password = message(
      t,
      'validation.passwordUppercase',
      'Password must contain at least one uppercase English letter',
    );
  } else if (!/\d/.test(password)) {
    errors.password = message(
      t,
      'validation.passwordDigit',
      'Password must contain at least one digit',
    );
  } else if (!/[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]/.test(password)) {
    errors.password = message(
      t,
      'validation.passwordSpecial',
      'Password must contain at least one special character',
    );
  } else if (!passwordAllowedCharacters.test(password)) {
    errors.password = message(
      t,
      'validation.passwordAllowedChars',
=======
    errors.token = t('Reset token is required');
  }

  if (!password) {
    errors.password = t('Password is required');
  } else if (password.length < 8) {
    errors.password = t('Password must be at least 8 characters long');
  } else if (!/[A-Z]/.test(password)) {
    errors.password = t('Password must contain at least one uppercase English letter');
  } else if (!/\d/.test(password)) {
    errors.password = t('Password must contain at least one digit');
  } else if (!/[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]/.test(password)) {
    errors.password = t('Password must contain at least one special character');
  } else if (!passwordAllowedCharacters.test(password)) {
    errors.password = t(
>>>>>>> Stashed changes
      'Password can contain only English letters, digits, and special characters',
    );
  }

  if (!confirmPassword) {
<<<<<<< Updated upstream
    errors.confirmPassword = message(
      t,
      'validation.confirmPasswordRequired',
      'Confirm password is required',
    );
  } else if (confirmPassword !== password) {
    errors.confirmPassword = message(
      t,
      'validation.passwordsDoNotMatch',
      'Passwords do not match',
    );
=======
    errors.confirmPassword = t('Confirm password is required');
  } else if (confirmPassword !== password) {
    errors.confirmPassword = t('Passwords do not match');
>>>>>>> Stashed changes
  }

  return errors;
}

<<<<<<< Updated upstream
export function validateProfileForm(values, t) {
=======
export function validateProfileForm(values, translateText) {
  const t = getTranslator(translateText);
>>>>>>> Stashed changes
  const errors = {};
  const email = normalizeString(values.email).trim();

  if (!email) {
<<<<<<< Updated upstream
    errors.email = message(t, 'validation.emailRequired', 'Email is required');
  } else if (!email.includes('@')) {
    errors.email = message(t, 'validation.emailMustContainAt', 'Email must contain @');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = message(t, 'validation.invalidEmailFormat', 'Invalid email format');
  } else if (isForbiddenDomain(getDomain(email))) {
    errors.email = message(
      t,
      'validation.forbiddenDomain',
      'Registration with this domain is not allowed',
    );
  }

  return errors;
}

export function validateAccountProfileForm(values, t) {
  const errors = {};
  const phoneNumber = normalizeString(values.phoneNumber).trim();

  if (!phoneNumber) {
    errors.phoneNumber = message(t, 'validation.phoneRequired', 'Phone Number is required');
  } else if (!/^\+380\d{9}$/.test(phoneNumber)) {
    errors.phoneNumber = message(
      t,
      'validation.phoneUkraineFormat',
      'Phone Number must use +380XXXXXXXXX format',
    );
=======
    errors.email = t('Email is required');
  } else if (!email.includes('@')) {
    errors.email = t('Email must contain @');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = t('Invalid email format');
  } else if (isForbiddenDomain(getDomain(email))) {
    errors.email = t('Registration with this domain is not allowed');
>>>>>>> Stashed changes
  }

  return errors;
}
