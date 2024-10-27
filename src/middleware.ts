import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {}

export const config = {
  matcher: ['/((?!api|_next|messages|images|fonts|manifest|serviceworker|favicon.ico|robots.txt).*)', '/'],
};
