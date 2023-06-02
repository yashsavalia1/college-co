import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(title === "" || description === "" || price < 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    try {
      const response = await fetch('/api/listings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, price }),
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
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="number"
        value={price}
        onChange={e => setPrice(parseFloat(e.target.value))}
        placeholder="Price"
      />
      {/* Other input fields for other fields */}
      <button type="submit">Create Listing</button>
    </form>
    </div>

  );
}
