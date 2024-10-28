import { Credentials, login as createSession } from '@/lib/session/client';
import { useState } from 'react';

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: Credentials) => {
    setIsLoading(true);
    await createSession(credentials);
    setIsLoading(false);
  };

  return {
    login,
    isLoading,
  };
}
