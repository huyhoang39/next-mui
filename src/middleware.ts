import { NextRequest } from 'next/server';

import { updateSession } from './lib/session/server';

export async function middleware(req: NextRequest) {
  return await updateSession(req);
}

export const config = {
  matcher: ['/((?!api|_next|messages|images|fonts|manifest|serviceworker|favicon.ico|robots.txt).*)', '/'],
};
