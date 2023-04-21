import type { NextApiRequest, NextApiResponse } from 'next';
import { initPocketBase } from '../../../utils/pocketbase-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pb = await initPocketBase(req, res);
  try {
    pb.authStore.clear();
    res.status(200).json({ signout: true });
    return;
  } catch (err: any) {
    res.status(400).json({ error: err });
  }
}
