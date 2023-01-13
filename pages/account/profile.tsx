import HomeLayout from '@components/HomeLayout';
import { CheckBadgeIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { GetServerSideProps, InferGetServerSidePropsType, NextApiRequest, NextApiResponse } from 'next';
import Image from 'next/image';
import PocketBase, { BaseAuthStore, Record } from 'pocketbase';
import { initPocketBase } from '../../utils/pocketbase-init';
import serializeAuthStore from '../../utils/serialize-authstore';
import useAuthStore from '../../utils/use-authstore';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const pb = await initPocketBase(req as NextApiRequest, res as NextApiResponse);

  return {
    props: {
      authStore: serializeAuthStore(pb.authStore),
      avatarUrl: pb.authStore.model ? pb.getFileUrl(pb.authStore.model as Record, pb.authStore.model.avatar) : '',
    },
  };
};

export default function Profile(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const authStore = useAuthStore();
  const pb = new PocketBase('https://college-co-db.fly.dev/');
  pb.authStore.save(authStore?.token ?? '', props.authStore.model);

  const model = pb.authStore.model;

  return (
    <HomeLayout className="p-3">
      <div className="card w-100 shadow-xl border-2 border-gray-300 p-3">
        <div className="text-3xl">Profile</div>
        <div>Name: {model?.name}</div>
        <div>Username: {model?.username}</div>
        <div>Email: {model?.email}</div>
        <div className="flex items-center">
          Verified:
          <span className="pl-1">
            {model?.verified ? (
              <CheckBadgeIcon width="1.5rem" fill="green" />
            ) : (
              <ExclamationCircleIcon width="1.5rem" fill="FireBrick" />
            )}
          </span>
        </div>
        <div>Account created: {new Date(model?.created || '').toLocaleDateString()}</div>
        <Image src={props.avatarUrl} alt={'temp'} width={245} height={222}></Image>
      </div>
    </HomeLayout>
  );
}
