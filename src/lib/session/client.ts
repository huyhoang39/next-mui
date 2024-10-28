import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { COOKIE_SESSION_KEY, decrypt, encrypt, EXPIRED_SECONDS } from '.';

export type Credentials = {
  email: string;
  password: string;
};

export async function login(data: Credentials) {
  // Verify credentials && get the user
  const user = { email: data.email, name: 'John' };

  // Create the session
  const expires = new Date(Date.now() + EXPIRED_SECONDS * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  setCookie(COOKIE_SESSION_KEY, session, { expires, httpOnly: false });
}

export function logout() {
  // Destroy the session
  deleteCookie(COOKIE_SESSION_KEY);
}

export async function getSession() {
  const session = getCookie(COOKIE_SESSION_KEY);
  if (!session) return null;
  return await decrypt(session);
}
