import { NextRequest, NextResponse } from 'next/server';

import { updateSession } from './lib/session/server';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const session = req.cookies.get('session')?.value;

  const isLoginPage = pathname.startsWith('/login');

  if (isLoginPage && !session) {
    return NextResponse.next();
  }

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return await updateSession(session);
}

export const config = {
  matcher: ['/((?!api|_next|messages|images|fonts|manifest|serviceworker|favicon.ico|robots.txt).*)', '/'],
};
