'use server';

import { createClient } from './server';
import { redirect } from 'next/navigation';

const signInWith = (provider: 'google' | 'github' | 'discord') => async () => {
  const supabase = await createClient();

  const auth_callback_url = `${process.env.SITE_URL}/api/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  console.log(data);

  if (error) {
    console.log(error);
    return;
  }

  if (!data.url) {
    console.log('No redirect URL provided');
    return;
  }

  redirect(data.url);
};

const signinWithGoogle = signInWith('google');

const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};

export { signinWithGoogle, signOut };
