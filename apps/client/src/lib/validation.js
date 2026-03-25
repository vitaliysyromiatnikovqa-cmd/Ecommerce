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

export function validateRegisterForm(values) {
  const errors = {};
  const email = normalizeString(values.email).trim();
  const password = normalizeString(values.password);
  const confirmPassword = normalizeString(values.confirmPassword);

  if (!email) {
    errors.email = 'Email is required';
  } else if (!email.includes('@')) {
    errors.email = 'Email must contain @';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format';
  } else if (isForbiddenDomain(getDomain(email))) {
    errors.email = 'Registration with this domain is not allowed';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  } else if (!/[A-Z]/.test(password)) {
    errors.password = 'Password must contain at least one uppercase English letter';
  } else if (!/\d/.test(password)) {
    errors.password = 'Password must contain at least one digit';
  } else if (!/[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]/.test(password)) {
    errors.password = 'Password must contain at least one special character';
  } else if (!passwordAllowedCharacters.test(password)) {
    errors.password =
      'Password can contain only English letters, digits, and special characters';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm password is required';
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}

export function validateLoginForm(values) {
  const errors = {};
  const email = normalizeString(values.email).trim();
  const password = normalizeString(values.password);

  if (!email) {
    errors.email = 'Email is required';
  } else if (!email.includes('@')) {
    errors.email = 'Email must contain @';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return errors;
}

export function validateForgotPasswordForm(values) {
  const errors = {};
  const email = normalizeString(values.email).trim();

  if (!email) {
    errors.email = 'Email is required';
  } else if (!email.includes('@')) {
    errors.email = 'Email must contain @';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format';
  }

  return errors;
}

export function validateResetPasswordForm(values) {
  const errors = {};
  const token = normalizeString(values.token).trim();
  const password = normalizeString(values.password);
  const confirmPassword = normalizeString(values.confirmPassword);

  if (!token) {
    errors.token = 'Reset token is required';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  } else if (!/[A-Z]/.test(password)) {
    errors.password = 'Password must contain at least one uppercase English letter';
  } else if (!/\d/.test(password)) {
    errors.password = 'Password must contain at least one digit';
  } else if (!/[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]/.test(password)) {
    errors.password = 'Password must contain at least one special character';
  } else if (!passwordAllowedCharacters.test(password)) {
    errors.password =
      'Password can contain only English letters, digits, and special characters';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm password is required';
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}

export function validateProfileForm(values) {
  const errors = {};
  const email = normalizeString(values.email).trim();

  if (!email) {
    errors.email = 'Email is required';
  } else if (!email.includes('@')) {
    errors.email = 'Email must contain @';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Invalid email format';
  } else if (isForbiddenDomain(getDomain(email))) {
    errors.email = 'Registration with this domain is not allowed';
  }

  return errors;
}
