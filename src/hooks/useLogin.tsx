import { Credentials, login as createSession } from '@/lib/session/client';
import { sleep } from '@/lib/utils/sleep';
import { useState } from 'react';

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: Credentials) => {
    setIsLoading(true);
    await sleep(2000);
    await createSession(credentials);
    setIsLoading(false);
  };

  return {
    login,
    isLoading,
  };
}
