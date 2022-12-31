import HomeCard from '@components/HomeCard';
import HomeLayout from '@components/HomeLayout';
import Navbar from '@components/Navbar';
import { Prompt } from '@next/font/google';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import PocketBase, { Record } from 'pocketbase';
import { useEffect, useState } from 'react';
import studentsBg from '../assets/students-background.jpg';
import styles from '../styles/Home.module.css';
import Listing from '../types/listing';
import initPocketBase from '../utils/pocketbase-init';

const prompt = Prompt({ weight: '700', subsets: ['latin'] });

export const getServerSideProps: GetServerSideProps<{
  listings: (Listing & { imageUrl: string })[];
}> = async ({ req, res }) => {
  const pb = await initPocketBase(
    req as NextApiRequest,
    res as NextApiResponse
  );

  const listings = (await pb.collection('listings').getList<Listing>(1, 50))
    .items;

  const listingsWithImages = listings.map((listing) => {
    const firstFilename = listing.images ? listing.images[0] : null;
    let url = '';
    if (firstFilename)
      url = pb.getFileUrl(listing as unknown as Record, firstFilename, {
        thumb: '100x250',
      });
    return { ...listing, imageUrl: url };
  });

  return {
    props: {
      listings: listingsWithImages,
    },
  };
};

export default function Home({
  listings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>CollegeCo</title>
      </Head>

      <HomeLayout>
        <div className="relative">
          <Image
            src={studentsBg}
            alt="students"
            priority
            className="-z-20 object-cover w-full max-h-96 
            min-h-[12rem] brightness-50"
          ></Image>
          <div
            className="text-center absolute top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2 select-none"
          >
            <div
              className={`flex animate-fade-in text-gray-200 ${prompt.className} md:text-5xl text-3xl`}
            >
              Welcome to the CollegeCo Marketplace
            </div>
          </div>
        </div>

        <section className="p-3">
          <h1 className="text-3xl mb-8">Listings</h1>
          <div className="flex flex-wrap gap-8 md:justify-start justify-center">
            {listings.map((listing) => (
              <HomeCard
                className="w-72"
                key={listing.id}
                listing={listing}
                thumbUrl={listing.imageUrl}
              ></HomeCard>
            ))}
          </div>
        </section>
      </HomeLayout>
    </>
  );
}
