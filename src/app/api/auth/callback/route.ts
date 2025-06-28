import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { createServer } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = await createServer();
  const { error, data } = await supabase.auth.exchangeCodeForSession(code);

  if (error) return NextResponse.redirect(`${origin}/error`);

  const userId = data.user?.id;
  const metadata = data.user?.user_metadata || {};

  const { data: existingUser, error: checkError } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .maybeSingle();

  if (checkError) {
    // optionally log checkError
    return NextResponse.redirect(`${origin}/error`);
  }

  if (!existingUser) {
    const { error: insertError } = await supabase.from('users').insert({
      id: userId,
      full_name: metadata.full_name,
      avatar_url: metadata.avatar_url,
    });

    if (insertError) {
      // optionally log insertError
      return NextResponse.redirect(`${origin}/error`);
    }
  }

  const forwardedHost = request.headers.get('x-forwarded-host');
  const isLocalEnv = process.env.NODE_ENV === 'development';
  const redirectBase = isLocalEnv
    ? origin
    : forwardedHost
      ? `https://${forwardedHost}`
      : origin;

  return NextResponse.redirect(
    `${redirectBase}${next.startsWith('/') ? next : '/' + next}`,
  );
}
