import { locales } from '@/i18n/routing';
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split('/');
  if (segments[1] && locales.includes(segments[1])) {
    return '/' + segments.slice(2).join('/');
  }
  return pathname;
}

// paths that don't require authentication
const publicPaths = [
  '/', // Landing page
  '/auth', // Auth pages
  '/profile/:id', // Public profile pages - using path pattern
];

export const updateSession = async (
  request: NextRequest,
  response: NextResponse,
) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const currentPath = stripLocalePrefix(request.nextUrl.pathname);

  // Check if the current path matches any public path pattern
  const isPublicPath = publicPaths.some((path) => {
    // Convert path pattern to regex
    const pattern = path.replace(':id', '[^/]+');
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(currentPath);
  });

  if (!session && !isPublicPath) {
    // no user, redirect to login page with current path as next
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    url.searchParams.set('next', currentPath);
    return NextResponse.redirect(url);
  }

  if (session && currentPath === '/auth') {
    const nextPath =
      currentPath === '/auth'
        ? request.nextUrl.searchParams.get('next') || '/' // Default to landing page
        : currentPath;

    // For logged in users trying to access auth pages, redirect to the next path
    const url = new URL(nextPath, request.url);
    return NextResponse.redirect(url);
  }

  if (session && currentPath === '/') {
    // Redirect to /projects
    const url = new URL('/projects', request.url);
    return NextResponse.redirect(url);
  }

  return response;
};
