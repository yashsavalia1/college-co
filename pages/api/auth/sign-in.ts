import type { NextApiRequest, NextApiResponse } from 'next';
import { initPocketBase } from '../../../utils/pocketbase-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pb = await initPocketBase(req, res);
  try {
    await pb.collection('users').authWithPassword(req.body.usernameOrEmail, req.body.password);
    res.status(200).json({ signedIn: true });
  } catch (_) {
    res.status(400).json({ signedIn: false });
  }
}
