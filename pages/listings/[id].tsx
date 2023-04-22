import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PocketBase, { Record } from 'pocketbase';
import { useEffect, useState } from 'react';
import Listing from '../../types/listing';
import { initPocketBase } from '../../utils/pocketbase-auth';

export const getServerSideProps: GetServerSideProps<{
  listing: Listing;
  imageUrls: string[];
}> = async (context) => {
  const pb = await initPocketBase(context.req, context.res);
  const id = context.params?.id;

  const listing = await pb.collection('listings').getFirstListItem<Listing>(`id='${id}'`);

  const imageUrls =
    listing.images?.map((image: string) => pb.getFileUrl(listing as unknown as Record, image, { thumb: '100x250' })) ??
    [];
  return {
    props: {
      listing: JSON.parse(JSON.stringify(listing)),
      imageUrls,
    },
  };
};

export default function ListingPage({ listing, imageUrls }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center">{listing.title}</h1>
      <div className="flex flex-wrap justify-center">
        {imageUrls.map((url, i) => (
          <Image key={i} src={url} fill style={{ objectFit: 'contain' }} alt={listing.images![i]} />
        ))}
      </div>
    </div>
  );
}
