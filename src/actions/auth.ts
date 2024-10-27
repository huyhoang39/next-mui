'use server';

import { login as loginToApp, logout as logoutFromApp } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  await loginToApp(formData);
  redirect('/');
}

export async function logout() {
  await logoutFromApp();
  redirect('/login');
}
