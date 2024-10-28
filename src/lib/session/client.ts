import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { decrypt, encrypt, expireSeconds } from '.';

export type Credentials = {
  email: string;
  password: string;
};

export async function login(data: Credentials) {
  // Verify credentials && get the user
  const user = { email: data.email, name: 'John' };

  // Create the session
  const expires = new Date(Date.now() + expireSeconds * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  setCookie('session', session, { expires, httpOnly: false });
}

export function logout() {
  // Destroy the session
  deleteCookie('session');
}

export async function getSession() {
  const session = getCookie('session');
  if (!session) return null;
  return await decrypt(session);
}
