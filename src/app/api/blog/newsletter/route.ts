import { NextRequest, NextResponse } from 'next/server';
import { BlogApiError, subscribeNewsletter } from '@/lib/blog-api';

export async function POST(request: NextRequest) {
  let body: { email?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    const data = await subscribeNewsletter(email, body.source ?? 'blog-sidebar');
    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof BlogApiError) {
      return NextResponse.json({ message: e.message }, { status: e.statusCode });
    }
    return NextResponse.json({ message: 'Subscription failed' }, { status: 500 });
  }
}
