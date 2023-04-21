import HomeCard from '@components/HomeCard';
import HomeLayout from '@components/HomeLayout';
import Navbar from '@components/Navbar';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Prompt } from '@next/font/google';
import { GetServerSideProps, InferGetServerSidePropsType, NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PocketBase, { BaseAuthStore, LocalAuthStore, Record } from 'pocketbase';
import { useContext, useEffect, useState } from 'react';
import studentsBg from '../../assets/students-background.jpg';
import styles from '../../styles/Home.module.css';
import Listing, { ListingRecord } from '../../types/listing';
import { AuthProps, initPocketBase, usePocketBase } from '../../utils/pocketbase-auth';
import serializeAuthStore from '../../utils/serialize-authstore';

const prompt = Prompt({ weight: '700', subsets: ['latin'] });

type Props = {
  listings: (Listing & { imageUrl: string })[];
};

export const getServerSideProps: GetServerSideProps<Props & AuthProps> = async ({ req, res, ...context }) => {
  const pb = await initPocketBase(req as NextApiRequest, res as NextApiResponse);

  const { query } = context.query;

  const listings = (
    await pb.collection('listings').getList<ListingRecord>(1, 50, {
      sort: '-created',
      filter: `title ~ '${query}' || description ~ '${query}' || tags ~ '${query}'`,
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
      authStore: serializeAuthStore(pb.authStore),
      listings: listingsWithImages,
    },
  };
};

export default function Home({ listings }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { query } = router.query;
  const pb = usePocketBase();

  const [searchQuery, setQuery] = useState<string>(query as string);

  return (
    <>
      <Head>
        <title>CollegeCo</title>
      </Head>

      <HomeLayout>
        <section className="p-3">
          <form
            className="input-group w-full justify-center mb-3"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/listings/search?query=${searchQuery}`);
            }}
          >
            <input
              type="text"
              placeholder="search"
              className="input input-bordered w-3/5"
              value={searchQuery}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button className="btn btn-square" type="submit">
              <MagnifyingGlassIcon className="w-6 h-6"></MagnifyingGlassIcon>
            </button>
          </form>
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
