import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname !== '/blog-post' &&
    request.nextUrl.pathname !== '/blog-post/'
  ) {
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
  matcher: ['/blog-post', '/blog-post/'],
};
