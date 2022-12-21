import Head from 'next/head'
import Image from 'next/image'
import { Inter, Prompt, } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Navbar from '@components/Navbar'
import HomeLayout from '@components/HomeLayout'
import HomeCard from '@components/HomeCard'
import PocketBase from 'pocketbase';
import studentsBg from '../assets/students-background.jpg'
import Listing from '../types/listing'

const inter = Inter({ subsets: ['latin'] })
const prompt = Prompt({ weight: "700", subsets: ['latin'] })

export async function getStaticProps() {

  // const pb = new PocketBase('http://127.0.0.1:8090');

  // const records = JSON.parse(JSON.stringify(await pb.collection('listings').getFullList()))
  const records: Listing[] = [{
    id: '1',
    title: 'Test',
    description: 'Test',
    price: 100,
    tags: ['test'],
    created: new Date().toISOString(),
    published: true,
    images: ['https://placeimg.com/400/225/arch'],
  }]
  return {
    props: {
      records,
    },
  }
}

export default function Home({ records }: { records: any }) {

  // const pb = new PocketBase('http://127.0.0.1:8090');

  // pb.collection('listings').getFullList().then((res) => {
  //   console.log(res)
  // });
  return (
    <>
      <Head>
        <title>CollegeCo</title>
      </Head>

      <HomeLayout>
        <div className="relative">
          <Image src={studentsBg} alt="students" priority className="-z-20 object-cover w-full max-h-96 min-h-[12rem]  brightness-50"></Image>
          <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
            <div className={`flex animate-fade-in text-gray-200 ${prompt.className} md:text-5xl text-3xl`}>Welcome to the CollegeCo Marketplace</div>
          </div>
        </div>

        <section className="p-3">
          <h1 className="text-3xl mb-8">
            Listings
          </h1>
          <div className="flex flex-wrap gap-8 md:justify-start justify-center">
            {records.map((record: any) => (
              <HomeCard className="w-72" key={record.id} listing={record}></HomeCard>
            ))}
            <HomeCard className="w-72"></HomeCard>
            <HomeCard className="w-72"></HomeCard>
            <HomeCard className="w-72"></HomeCard>
            <HomeCard className="w-72"></HomeCard>
            <HomeCard className="w-72"></HomeCard>
            <HomeCard className="w-72"></HomeCard>
            <HomeCard className="w-72"></HomeCard>
            <HomeCard className="w-72"></HomeCard>
          </div>
        </section>
      </HomeLayout>
    </>
  )
}
