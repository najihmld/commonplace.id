'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useState } from 'react';
import { type User } from '@supabase/supabase-js';

const UserSessionContext = createContext<User | undefined | null>(null);
export const useUserSession = () => useContext(UserSessionContext);

export function Providers({
  user,
  children,
}: {
  user?: User | null;
  children: ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <UserSessionContext.Provider value={user}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </UserSessionContext.Provider>
  );
}
