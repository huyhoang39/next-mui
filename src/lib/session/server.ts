import { cookies } from 'next/headers';
import { decrypt, encrypt, expireSeconds } from '.';
import { NextRequest, NextResponse } from 'next/server';

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + expireSeconds * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    expires: parsed.expires,
  });
  return res;
}
