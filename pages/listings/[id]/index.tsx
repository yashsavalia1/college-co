import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PocketBase, { Record } from 'pocketbase';
import { useEffect, useState } from 'react';
import Listing from '../../../types/listing';
import { initPocketBase, usePocketBase } from '../../../utils/pocketbase-auth';


export const getServerSideProps: GetServerSideProps<{
  listing: Listing;
  imageUrls: string[];
  userId: string | null;
}> = async (context) => {
  const pb = await initPocketBase(context.req, context.res);
  const id = context.params?.id;
  const userId = pb.authStore.model?.id.toString() ?? null;

  const listing = await pb.collection('listings').getFirstListItem<Listing>(`id='${id}'`);

  const imageUrls =
    listing.images?.map((image: string) => pb.getFileUrl(listing as unknown as Record, image, { thumb: '100x250' })) ??
    [];

  return {
    props: {
      listing: JSON.parse(JSON.stringify(listing)),
      imageUrls,
      userId,
    },
  };
};

export default function ListingPage({
  listing,
  imageUrls,
  userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const pb = usePocketBase();
  const router = useRouter();
  const [editedListing, setEditedListing] = useState<Listing | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const isOwner = userId === listing.user;

  const handleEditStart = () => {
    setEditedListing({ ...listing });
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      // Ensure that the user deleting the listing is its owner
      console.log(userId, listing.user);
      console.log(pb.authStore.model?.id.toString(), listing.user);
      // why do these not match? ^^
      if (userId !== listing.user) {
        alert('You are not the owner of this listing');
        return;
      }

      await pb.collection('listings').delete(listing.id);

      router.push('/');
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      if (userId !== listing.user) {
        alert('You are not the owner of this listing');
        return;
      }
      // Ensure that editedListing is not null before attempting to update
      if (!editedListing) {
        alert('Something went wrong, please try again');
        return;
      }
  
      await pb.collection('listings').update(editedListing.id, editedListing);
      router.refresh();
      // Reset the editing state
      setIsEditing(false);
    } catch (error: any) {
      console.error(error);
    }
  };
  
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedListing((prevListing) => {
      // If prevListing is null, return null
      if (!prevListing) return null;
  
      // Otherwise, return the updated listing
      return { ...prevListing, [name]: value };
    });
  };

  return (
    <div className="flex flex-col items-center">
      {isEditing && editedListing ? (
        <form onSubmit={handleEdit}>
          <label>
            Title:
            <input type="text" name="title" value={editedListing.title} onChange={handleChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={editedListing.description} onChange={handleChange} />
          </label>
          <label>
            Price:
            <input type="number" name="price" value={editedListing.price} onChange={handleChange} />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center">{listing.title}</h1>
          <p className="text-xl">{listing.description}</p>
          <p className="text-xl">${listing.price}</p>
          {isOwner && (
            <>
              <button onClick={handleEditStart}>Edit this listing</button>
              <button onClick={handleDelete}>Delete this listing</button>
            </>
          )}
          <hr className="my-4" />
          <h2 className="text-2xl font-bold text-center">Images</h2>
          <div className="flex flex-wrap justify-center">
            {imageUrls.map((url, i) => (
              <Image key={i} src={url} width={500} height={300} style={{ objectFit: 'contain' }} alt={listing.images![i]} />
            ))}
          </div>
        </>
      )}
    </div>
  );

}

