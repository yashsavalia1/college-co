import HomeCard from '@components/HomeCard';
import HomeLayout from '@components/HomeLayout';
import Navbar from '@components/Navbar';
import { Prompt } from '@next/font/google';
import { GetServerSideProps, InferGetServerSidePropsType, NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PocketBase, { BaseAuthStore, LocalAuthStore, Record } from 'pocketbase';
import { useContext, useEffect, useState } from 'react';
import studentsBg from '../assets/students-background.jpg';
import styles from '../styles/Home.module.css';
import Listing, { ListingRecord } from '../types/listing';
import { initPocketBase } from '../utils/pocketbase-auth';
import serializeAuthStore from '../utils/serialize-authstore';

const prompt = Prompt({ weight: '700', subsets: ['latin'], display: 'swap' });

type Props = {
  listings: (Listing & { imageUrl: string })[];
  authStore: BaseAuthStore;
  avatarUrl?: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
  const pb = await initPocketBase(req, res);

  const listings = (
    await pb.collection('listings').getList<ListingRecord>(1, 50, {
      sort: '-created',
    })
  ).items;

  const listingsWithImages = listings.map((listing) => {
    const firstFilename = listing.images ? listing.images[0] : null;
    let url = '';
    if (firstFilename)
      url = pb.getFileUrl(listing, firstFilename, {
        thumb: '100x250',
      });
    return { ...listing, imageUrl: url };
  });

  return {
    props: {
      listings: listingsWithImages,
      authStore: serializeAuthStore(pb.authStore),
    },
  };
};

export default function Home({ listings }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
            <div className={`flex animate-fade-in text-gray-200 ${prompt.className} md:text-5xl text-3xl`}>
              Welcome to the CollegeCo Marketplace
            </div>
          </div>
        </div>

        <section className="p-3">
          <h1 className="text-3xl mb-8">Latest Listings</h1>
          <div className="flex flex-wrap gap-8 md:justify-start justify-center">
            {listings.map((listing) => (
              <HomeCard
                className="sm:w-72 w-screen"
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
