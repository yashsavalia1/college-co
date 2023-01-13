import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { useState } from 'react';

export default function SignIn() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <div className="h-screen grid place-items-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl self-center">Sign In</h1>
        <label htmlFor="username-or-email">Username or Email</label>
        <input
          className="input input-bordered"
          type="text"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          className="input input-bordered"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn"
          type="button"
          onClick={async () => {
            let signedIn = await fetch('/api/auth/sign-in', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ usernameOrEmail: usernameOrEmail, password }),
            });
            if (signedIn.status == 200) router.push('/');
            if (signedIn.status >= 400) alert('Invalid username or password');
          }}
        >
          Sign In
        </button>
        <Link href="/sign-up" className="hover:underline">
          Don&apos;t Have an Account?
        </Link>
      </div>
    </div>
  );
}
