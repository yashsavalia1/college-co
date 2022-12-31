import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PocketBase, { Record } from 'pocketbase';
import { useEffect, useState } from 'react';
import Listing from '../../types/listing';

const pb = new PocketBase('https://college-co-db.fly.dev/');

export const getServerSideProps: GetServerSideProps<{
  listing: Listing;
  imageUrls: string[];
}> = async (context) => {
  const id = context.params?.id;

  const listing = await pb
    .collection('listings')
    .getFirstListItem<Listing>(`id='${id}'`);

  const imageUrls =
    listing.images?.map((image: string) =>
      pb.getFileUrl(listing as unknown as Record, image, { thumb: '100x250' })
    ) ?? [];
  return {
    props: {
      listing: JSON.parse(JSON.stringify(listing)),
      imageUrls,
    },
  };
};

export default function ListingPage({
  listing,
  imageUrls,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>{listing.title}</h1>
      <div>
        {imageUrls.map((url, i) => (
          <Image
            key={i}
            src={url}
            fill
            style={{ objectFit: 'contain' }}
            alt={listing.images![i]}
          />
        ))}
      </div>
    </div>
  );
}
