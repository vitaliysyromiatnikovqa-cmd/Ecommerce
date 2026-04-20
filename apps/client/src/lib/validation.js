const forbiddenDomains = ['ru', 'ail.ru', 'mail.ru', 'yandex.ru', 'bk.ru', 'inbox.ru'];
const passwordAllowedCharacters = /^[A-Za-z\d!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]+$/;

function normalizeString(value) {
  return typeof value === 'string' ? value : '';
}

function getDomain(email) {
  return email.split('@')[1]?.toLowerCase() ?? '';
}

function isForbiddenDomain(domain) {
  return domain === 'ru' || domain.endsWith('.ru') || forbiddenDomains.includes(domain);
}

function message(t, key, fallback) {
  return typeof t === 'function' ? t(key) : fallback;
}

export function validateRegisterForm(values, t) {
  const errors = {};
  const email = normalizeString(values.email).trim();
  const password = normalizeString(values.password);
  const confirmPassword = normalizeString(values.confirmPassword);

  if (!email) {
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
      'Password can contain only English letters, digits, and special characters',
    );
  }

  if (!confirmPassword) {
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

  return errors;
}

export function validateLoginForm(values, t) {
  const errors = {};
  const email = normalizeString(values.email).trim();
  const password = normalizeString(values.password);

  if (!email) {
    errors.email = message(t, 'validation.emailRequired', 'Email is required');
  } else if (!email.includes('@')) {
    errors.email = message(t, 'validation.emailMustContainAt', 'Email must contain @');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = message(t, 'validation.invalidEmailFormat', 'Invalid email format');
  }

  if (!password) {
    errors.password = message(t, 'validation.passwordRequired', 'Password is required');
  }

  return errors;
}

export function validateForgotPasswordForm(values, t) {
  const errors = {};
  const email = normalizeString(values.email).trim();

  if (!email) {
    errors.email = message(t, 'validation.emailRequired', 'Email is required');
  } else if (!email.includes('@')) {
    errors.email = message(t, 'validation.emailMustContainAt', 'Email must contain @');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = message(t, 'validation.invalidEmailFormat', 'Invalid email format');
  }

  return errors;
}

export function validateResetPasswordForm(values, t) {
  const errors = {};
  const token = normalizeString(values.token).trim();
  const password = normalizeString(values.password);
  const confirmPassword = normalizeString(values.confirmPassword);

  if (!token) {
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
      'Password can contain only English letters, digits, and special characters',
    );
  }

  if (!confirmPassword) {
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

  return errors;
}

export function validateProfileForm(values, t) {
  const errors = {};
  const email = normalizeString(values.email).trim();

  if (!email) {
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
