import Carousel from '@components/Carousel';
import HomeLayout from '@components/HomeLayout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Listing, { ListingRecord } from '../../types/listing';
import { initPocketBase } from '../../utils/pocketbase-auth';

export const getServerSideProps: GetServerSideProps<{
  listing: Listing;
  imageUrls: string[];
}> = async (context) => {
  const pb = await initPocketBase(context.req, context.res);
  const id = context.params?.id;

  const listing = await pb.collection('listings').getFirstListItem<ListingRecord>(`id='${id}'`);

  const imageUrls = listing.images?.map((image: string) => pb.getFileUrl(listing, image, { thumb: '100x250' })) ?? [];
  return {
    props: {
      listing: JSON.parse(JSON.stringify(listing)),
      imageUrls,
    },
  };
};

export default function ListingPage({ listing, imageUrls }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <HomeLayout>
      <div className="flex md:flex-row-reverse flex-col items-center">
        <div className="flex-1 flex justify-center items-start">
          <h1
            className="text-3xl
          font-bold
          "
          >
            {listing.title}
          </h1>
        </div>

        <div className="flex-1">
          <Carousel className="h-72 m-10">
            {imageUrls.map((url, i) => (
              <div key={i} className="h-72">
                <Image fill src={url} className="object-contain !relative" alt={listing.images![i]} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </HomeLayout>
  );
}
