import { NextRequest, NextResponse } from 'next/server';
import { BlogApiError, submitLead } from '@/lib/blog-api';
import type { LeadSubmitInput } from '@/types/lead';

export async function POST(request: NextRequest) {
  let body: Partial<LeadSubmitInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  const fullName = body.fullName?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const message = body.message?.trim();

  if (!fullName) {
    return NextResponse.json({ message: 'Full name is required' }, { status: 400 });
  }
  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ message: 'Phone is required' }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ message: 'Message is required' }, { status: 400 });
  }

  try {
    const data = await submitLead({ fullName, email, phone, message });
    return NextResponse.json(
      { message: 'Lead submitted successfully.', data },
      { status: 201 },
    );
  } catch (e) {
    if (e instanceof BlogApiError) {
      return NextResponse.json({ message: e.message }, { status: e.statusCode });
    }
    return NextResponse.json({ message: 'Could not submit your request' }, { status: 500 });
  }
}
