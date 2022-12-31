import { NextApiRequest, NextApiResponse } from 'next';
import PocketBase from 'pocketbase';

async function initPocketBase(req: NextApiRequest, res: NextApiResponse) {
  const pb = new PocketBase('https://college-co-db.fly.dev/');

  // load the store data from the request cookie string
  pb.authStore.loadFromCookie(req?.headers?.cookie || '');

  // send back the default 'pb_auth' cookie to the client with the latest store state
  pb.authStore.onChange(() => {
    res?.setHeader('set-cookie', pb.authStore.exportToCookie());
  });

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    pb.authStore.isValid && (await pb.collection('users').authRefresh());
  } catch (_) {
    // clear the auth store on failed refresh
    pb.authStore.clear();
  }

  return pb;
}

export default initPocketBase;
