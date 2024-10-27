import { login } from '@/actions/auth';

export default async function Page() {
  return (
    <section>
      <form action={login}>
        <input type="email" name="email" placeholder="Email" />
        <br />
        <button type="submit">Login</button>
      </form>
    </section>
  );
}
