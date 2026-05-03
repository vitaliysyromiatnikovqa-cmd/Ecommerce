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
  if (typeof t !== 'function') {
    return fallback;
  }

  const translated = t(key);
  return translated === key ? fallback : translated;
}

export function validateRegisterForm(values, t) {
  const errors = {};
  const fullName = normalizeString(values.fullName).trim();
  const email = normalizeString(values.email).trim();
  const password = normalizeString(values.password);
  const confirmPassword = normalizeString(values.confirmPassword);

  if (!fullName) {
    errors.fullName = message(t, 'validation.fullNameRequired', 'Full Name is required');
  }

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

  if (!values.termsAccepted) {
    errors.termsAccepted = message(
      t,
      'validation.termsRequired',
      'You must agree to the Terms of Service and Privacy Policy',
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
  }

  return errors;
}
