import type { NextApiRequest, NextApiResponse } from 'next';
import { initPocketBase } from '../../../../../../utils/pocketbase-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const pb = await initPocketBase(req, res);

    const { id } = req.query; 

    const listing = await pb.collection('listings').getFirstListItem(`id='${id}'`);

    // Ensure that the user deleting the listing is its owner
    if (pb.authStore.model?.id.toString() !== listing.user) {
      res.status(403).json({ error: 'Forbidden' });
    }

    await pb.collection('listings').delete(id as string);

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
