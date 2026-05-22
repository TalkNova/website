import { NextRequest, NextResponse } from 'next/server';
import { BlogApiError, fetchBlogPosts } from '@/lib/blog-api';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const category = searchParams.get('category') ?? undefined;
  const q = searchParams.get('q') ?? undefined;
  const featured = searchParams.get('featured');
  const sort = searchParams.get('sort') as 'publishedAt' | 'title' | null;

  try {
    const result = await fetchBlogPosts(
      {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        category,
        q,
        featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
        sort: sort ?? undefined,
      },
      { cache: 'no-store', revalidate: false },
    );
    return NextResponse.json(result);
  } catch (e) {
    if (e instanceof BlogApiError) {
      return NextResponse.json({ message: e.message }, { status: e.statusCode });
    }
    return NextResponse.json({ message: 'Failed to load posts' }, { status: 500 });
  }
}
