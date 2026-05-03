const forbiddenDomains = ['ru', 'ail.ru', 'mail.ru', 'yandex.ru', 'bk.ru', 'inbox.ru'];
const passwordAllowedCharacters = /^[A-Za-z\d!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]+$/;

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function getDomain(email) {
  return email.split('@')[1]?.toLowerCase() ?? '';
}

function isForbiddenDomain(domain) {
  return domain === 'ru' || domain.endsWith('.ru') || forbiddenDomains.includes(domain);
}

export function validateEmail(email) {
  if (email === undefined || email === null || email === '') {
    return 'Email is required';
  }

  if (typeof email !== 'string') {
    return 'Email must be a string';
  }

  if (!email.trim()) {
    return 'Email is required';
  }

  const normalizedEmail = email.trim();

  if (!normalizedEmail.includes('@')) {
    return 'Email must contain @';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return 'Invalid email format';
  }

  if (isForbiddenDomain(getDomain(normalizedEmail))) {
    return 'Registration with this domain is not allowed';
  }

  return '';
}

export function validatePassword(password) {
  if (password === undefined || password === null || password === '') {
    return 'Password is required';
  }

  if (typeof password !== 'string') {
    return 'Password must be a string';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase English letter';
  }

  if (!/\d/.test(password)) {
    return 'Password must contain at least one digit';
  }

  if (!/[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]/.test(password)) {
    return 'Password must contain at least one special character';
  }

  if (!passwordAllowedCharacters.test(password)) {
    return 'Password can contain only English letters, digits, and special characters';
  }

  return '';
}

export function validateConfirmPassword(password, confirmPassword) {
  if (confirmPassword === undefined || confirmPassword === null || confirmPassword === '') {
    return 'Confirm password is required';
  }

  if (typeof confirmPassword !== 'string') {
    return 'Confirm password must be a string';
  }

  if (!isNonEmptyString(password)) {
    return '';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  return '';
}

export function validateOptionalFullName(fullName) {
  if (fullName === undefined || fullName === null) {
    return '';
  }

  if (typeof fullName !== 'string') {
    return 'Full Name must be a string';
  }

  if (!fullName.trim()) {
    return 'Full Name is required';
  }

  return '';
}

export function validateOptionalTermsAccepted(termsAccepted) {
  if (termsAccepted === undefined || termsAccepted === null) {
    return '';
  }

  if (termsAccepted !== true) {
    return 'You must agree to the Terms of Service and Privacy Policy';
  }

  return '';
}
