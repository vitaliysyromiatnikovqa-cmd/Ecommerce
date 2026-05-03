import { getAccessToken } from './auth';
import { getCurrentLocale, translateRawText } from './i18n';

async function readJson(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const locale = getCurrentLocale();
    const translatedFieldErrors = Object.fromEntries(
      Object.entries(data.errors || {}).map(([field, message]) => [
        field,
        translateRawText(message, locale),
      ]),
    );
    const error = new Error(translateRawText(data.message || 'Request failed', locale));
    error.status = response.status;
    error.fieldErrors = translatedFieldErrors;
    throw error;
  }

  const locale = getCurrentLocale();
  return {
    ...data,
    message: translateRawText(data.message, locale),
    errors: Object.fromEntries(
      Object.entries(data.errors || {}).map(([field, message]) => [
        field,
        translateRawText(message, locale),
      ]),
    ),
  };
}

function createJsonRequestOptions(method, payload, authRequired = false) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (authRequired) {
    const accessToken = getAccessToken();

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return {
    method,
    headers,
    body: payload ? JSON.stringify(payload) : undefined,
  };
}

export function registerUser(payload) {
  return fetch('/api/auth/register', createJsonRequestOptions('POST', payload)).then(readJson);
}

export function loginUser(payload) {
  return fetch('/api/auth/login', createJsonRequestOptions('POST', payload)).then(readJson);
}

export function getCurrentUser() {
  return fetch('/api/auth/me', createJsonRequestOptions('GET', null, true)).then(readJson);
}

export function updateCurrentUser(payload) {
  return fetch('/api/users/me', createJsonRequestOptions('PATCH', payload, true)).then(readJson);
}

export function deleteCurrentUser(userId) {
  return fetch(`/api/users/${userId}`, createJsonRequestOptions('DELETE', null, true)).then(readJson);
}

export function forgotPassword(payload) {
  return fetch('/api/auth/forgot-password', createJsonRequestOptions('POST', payload)).then(readJson);
}

export function resetPassword(payload) {
  return fetch('/api/auth/reset-password', createJsonRequestOptions('POST', payload)).then(readJson);
}
