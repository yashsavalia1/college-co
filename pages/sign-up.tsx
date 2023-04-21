import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/router';
import PocketBase from 'pocketbase';
import { Dispatch, FormEvent, HTMLInputTypeAttribute, SetStateAction, useState } from 'react';

function FormElement({
  name,
  type,
  value,
  setValue,
}: {
  name: string;
  type: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name.toLowerCase()} className="capitalize">
        {name.split('-').join(' ')}
      </label>
      <input
        id={name.toLowerCase()}
        type={type}
        className="input input-bordered"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default function SignUp() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const router = useRouter();

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password != confirmPass) {
      alert('Passwords do not match');
      return;
    }

    fetch(e.currentTarget.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, email, password }),
    }).then((res) => {
      if (res.redirected) router.push(res.url);
    });
  };

  return (
    <div className="h-screen grid place-items-center">
      <form action="/api/auth/sign-up" method="POST" onSubmit={submitForm}>
        <h1 className="text-3xl self-center pb-2 text-center">Sign Up</h1>
        <div className="grid gap-2 pb-2">
          <FormElement name="name" type="text" value={name} setValue={setName} />
          <FormElement name="username" type="text" value={username} setValue={setUsername} />
          <FormElement name="email" type="text" value={email} setValue={setEmail} />
          <FormElement name="password" type="password" value={password} setValue={setPassword} />
          <FormElement name="confirm-password" type="password" value={confirmPass} setValue={setConfirmPass} />
        </div>
        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
