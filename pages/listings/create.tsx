import { Dispatch, FormEvent, HTMLInputTypeAttribute, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import { initPocketBase, usePocketBase } from '../../utils/pocketbase-auth';
import serializeAuthStore from '../../utils/serialize-authstore';
import PocketBase, { BaseAuthStore, Record } from 'pocketbase';
import { GetServerSideProps, InferGetServerSidePropsType, NextApiRequest, NextApiResponse } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const pb = await initPocketBase(req, res);

  return {
    props: {
      authStore: serializeAuthStore(pb.authStore),
    },
  };
};

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");
  const router = useRouter();
  const pb = usePocketBase();
  const model = pb.authStore.model;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(title.trim() === "" || description.trim() === "" || price < 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    try {
      const response = await fetch('/api/collections/listings/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, price, userId: model?.id.toString() }),
      });      

      if (response.ok) {
        // Redirect to the home page after the listing is created
        router.push('/');
      } else {
        const data = await response.json();
        console.error(data);
      }
    } catch (error: any) {
      console.error(error);
      setError("There was an error creating your listing. Please try again.");
    }
  };
  return (
    <div className="h-screen grid place-items-center">
      {error && <p>{error}</p>}
      <form action="/api/collections/listings/records" method="POST" onSubmit={handleSubmit}>
        <h1 className="text-3xl self-center pb-2 text-center">Create Listing</h1>
        <div className="grid gap-2 pb-2">
          <StringFormElement name="title" type="text" value={title} setValue={setTitle} />
          <StringFormElement name="description" type="text" value={description} setValue={setDescription} />
          <NumberFormElement name="price" type="number" value={price} setValue={setPrice} />
        </div>
        <button className="btn" type="submit">Create Listing</button>
      </form>
    </div>
  );
}

function StringFormElement({
  name,
  type,
  value,
  setValue,
}: {
  name: string;
  type: HTMLInputTypeAttribute;
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

function NumberFormElement({
  name,
  type,
  value,
  setValue,
}: {
  name: string;
  type: HTMLInputTypeAttribute;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
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
        value={value.toString()}
        onChange={(e) => setValue(parseFloat(e.target.value))}
      />
    </div>
  );
}




