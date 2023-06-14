import type { NextApiRequest, NextApiResponse } from 'next';
import { initPocketBase } from '../../../../../utils/pocketbase-auth';
import { NewListing } from '../../../../../types/listing';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pb = await initPocketBase(req, res);
  
  try {
    const listingData: NewListing = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      user: req.body.userId,
      published: false,
      created: new Date().toISOString(),
    };

    const listing = await pb.collection('listings').create(listingData);
    res.status(200).json({ listing });
    return;
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: true });
  }
}
