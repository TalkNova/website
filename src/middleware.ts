import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  GOOGLE_SITE_VERIFICATION_PATH,
  googleSiteVerificationResponse,
} from '@/lib/google-verification';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === GOOGLE_SITE_VERIFICATION_PATH) {
    return googleSiteVerificationResponse();
  }

  if (pathname !== '/blog-post' && pathname !== '/blog-post/') {
    return NextResponse.next();
  }

  const slug = request.nextUrl.searchParams.get('slug');
  if (slug) {
    return NextResponse.redirect(
      new URL(`/blog/${encodeURIComponent(slug)}`, request.url),
    );
  }

  return NextResponse.redirect(new URL('/blog', request.url));
}

export const config = {
  matcher: [GOOGLE_SITE_VERIFICATION_PATH, '/blog-post', '/blog-post/'],
};
