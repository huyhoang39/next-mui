import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { COOKIE_SESSION_KEY, decrypt, encrypt, EXPIRED_SECONDS } from '.';

export async function getSession() {
  const session = cookies().get(COOKIE_SESSION_KEY)?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(session: string) {
  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + EXPIRED_SECONDS * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: COOKIE_SESSION_KEY,
    value: await encrypt(parsed),
    expires: parsed.expires,
  });
  return res;
}
