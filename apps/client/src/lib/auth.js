const STORAGE_KEY = 'gamereason-session';

export function saveSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function getSession() {
  const value = localStorage.getItem(STORAGE_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getAccessToken() {
  return getSession()?.accessToken ?? '';
}
