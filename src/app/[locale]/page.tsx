'use client';

import { Button } from '@/components/common/button';
import { signinWithGoogle } from '@/lib/supabase/actions';

export default function Home() {
  return (
    <form>
      <Button formAction={signinWithGoogle}>Login with Google</Button>
    </form>
  );
}
