import { redirect } from 'next/navigation';

import { isBrowser } from './is-server';

export function hardNavigate(path: string) {
  if (isBrowser()) {
    window.location.href = path;
  } else {
    redirect(path);
  }
}
export function clientReload() {
  if (isBrowser()) {
    window.location.reload();
  }
}
