'use client';

import useLogin from '@/hooks/useLogin';
import { hardNavigate } from '@/lib/utils/router';

export default function Page() {
  const { isLoading, login } = useLogin();

  const onLogin = async (formData: FormData) => {
    await login({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    hardNavigate('/');
  };

  return (
    <section>
      <form action={onLogin}>
        <input type="email" name="email" placeholder="Email" />
        <br />
        <input type="password" name="password" placeholder="Password" />
        <br />
        <button type="submit">Login</button>
      </form>
      {isLoading && 'Login to app...'}
    </section>
  );
}
