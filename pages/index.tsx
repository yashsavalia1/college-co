import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import styles from '../styles/Home.module.css'
import ItemCard from '../components/itemcard'
import GridView from '../components/gridview'
import { useEffect, useState } from 'react'
import TruncatedCard from '../types/truncated-data'
import { Category, FullAddress, PrismaClient } from '@prisma/client'
import { DisplayListing } from '../types/DisplayListing'

export const getServerSideProps = async () => {

  const prisma = new PrismaClient();
  const listings = await prisma.listing.findMany({ where: { published: true } });

  const displayListings: DisplayListing[] = [];
  const addresses = await prisma.fullAddress.findMany();

  for (const listing of listings) {
    displayListings.push(
      {
        id: listing.id,
        title: listing.title,
        price: listing.price.toNumber(),
        description: listing.description,
        categories: listing.categories,
        address: addresses.find(address => address.id == listing.addressId) || null,
        pictureLink: "https://thumbor.offerup.com/-Wbg8OfMLeq9cbhL9gO46_49wJg=/750x1000/b539/b53931ddd0064b29b930c8d35f1b17e7.jpg"
      }
    )

  }
  //console.log("Listings:", displayListings);

  return {
    props: { listings: displayListings }
  }
}

const Home: NextPage<{ listings: DisplayListing[] }> = ({ listings }: { listings: DisplayListing[] }) => {

  return (
    <div className={styles.container}>
      <GridView>
        {listings.map(listing => <ItemCard key={listing.id} cardData={listing} />
        )}
      </GridView>
    </div>
  )
}

export default Home
