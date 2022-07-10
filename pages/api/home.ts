import { FullAddress, Listing, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = Listing[]
const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'GET') {
        const listings = await prisma.listing.findMany();
        const displayListings: { item_id: string; title: string; cost: number; address: FullAddress | null; picture_link: string; }[] = [];
        listings.forEach(async (listing, index) => {

            let displayListing = {
                item_id: listing.id,
                title: listing.title,
                cost: listing.price.toNumber(),
                address: await prisma.fullAddress.findUnique({
                    where: {
                        id: listing.addressId
                    }
                }),
                picture_link: "https://thumbor.offerup.com/-Wbg8OfMLeq9cbhL9gO46_49wJg=/750x1000/b539/b53931ddd0064b29b930c8d35f1b17e7.jpg",
            }
        })

        res.status(200).json(listings)
    }
}

/*
    res.status(200).json({
            "user_id": "test01",
            "main_page_data": [{
                "item_id": "000001",
                "picture_link": "https://thumbor.offerup.com/-Wbg8OfMLeq9cbhL9gO46_49wJg=/750x1000/b539/b53931ddd0064b29b930c8d35f1b17e7.jpg",
                "title": "Snowman Head",
                "cost": 28.50,
                "address": "Paxton, IL"
            },
            {
                "item_id": "000002",
                "picture_link": "https://thumbor.offerup.com/_AQVN17hX6e9PeRHIZhTq-8iUIc=/333x250/1f1a/1f1ab9703c10460abaa51cf52b6777b3.jpg",
                "title": "Couch",
                "cost": 600,
                "address": "Paxton, IL"
            },
            {
                "item_id": "000003",
                "picture_link": "https://thumbor.offerup.com/_AQVN17hX6e9PeRHIZhTq-8iUIc=/333x250/1f1a/1f1ab9703c10460abaa51cf52b6777b3.jpg",
                "title": "Sofa",
                "cost": 800,
                "address": "Urbana, IL"
            },
            {
                "item_id": "000004",
                "picture_link": "https://thumbor.offerup.com/_AQVN17hX6e9PeRHIZhTq-8iUIc=/333x250/1f1a/1f1ab9703c10460abaa51cf52b6777b3.jpg",
                "title": "Futon",
                "cost": 100,
                "address": "Champaign, IL"
            }
            ]

        })
*/