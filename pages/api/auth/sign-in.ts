import type { NextApiRequest, NextApiResponse } from 'next';
import { initPocketBase, signIn } from '../../../utils/pocketbase-init';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pb = await initPocketBase(req, res);
  try {
    const authData = await pb.collection('users').authWithPassword(req.body.usernameOrEmail, req.body.password);
    res.status(200).json({ signedIn: true });
    return;
  } catch (err: any) {
    console.log(err);
  }
  res.status(400).json({ signedIn: false });
}
