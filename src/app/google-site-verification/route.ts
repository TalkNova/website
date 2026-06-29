import { NextResponse } from 'next/server';

const GOOGLE_VERIFICATION = 'google-site-verification: google5a2c0500c9d9d78d.html';

export function GET() {
  return new NextResponse(GOOGLE_VERIFICATION, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
