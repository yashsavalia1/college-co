import type { NextApiRequest, NextApiResponse } from 'next';
import { initPocketBase, signIn } from '../../../utils/pocketbase-init';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pb = await initPocketBase(req, res);
  try {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      emailVisibility: false,
      password: req.body.password,
      passwordConfirm: req.body.password,
      name: req.body.name,
    };

    const user = await pb.collection('users').create(userData);
    await pb.collection('users').requestVerification(req.body.email);

    res.status(200).redirect('/sign-in');
    return;
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: true });
  }
}
