import logo from '@assets/CollegeCo.png';
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/solid';
import { Prompt } from '@next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PocketBase, { Record } from 'pocketbase';
import useAuthStore from '../utils/use-authstore';
import NavbarSearchBar from './NavbarSearchBar';

const prompt = Prompt({ weight: '700', subsets: ['latin'] });

export default function Navbar() {
  const router = useRouter();
  const authStore = useAuthStore();
  const pb = new PocketBase('https://college-co-db.fly.dev/');

  return (
    <nav className="navbar bg-gray-300">
      <div className="md:hidden">
        <label htmlFor="main-drawer" className="btn btn-square btn-ghost">
          <Bars3Icon className="w-6 h-6"></Bars3Icon>
        </label>
      </div>

      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl content-center">
          <div className="w-10 md:mr-4 mr-0 align-middle">
            <Image src={logo} alt="Logo" style={{ objectFit: 'contain' }} />
          </div>
          <span className={`text-2xl md:block hidden ${prompt.className}`}>CollegeCo</span>
        </Link>

        <div className="md:block hidden">
          <Link href="/" className="btn btn-ghost normal-case">
            Navbar Item 1
          </Link>
          <Link href="/" className="btn btn-ghost normal-case">
            Navbar Item 2
          </Link>
        </div>
      </div>

      <div className="flex-none gap-4">
        <div className="form-control md:flex hidden">
          <NavbarSearchBar />
        </div>
        {authStore?.token ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {authStore.model?.avatar ? (
                  <Image
                    src={pb.getFileUrl(authStore.model as Record, authStore.model?.avatar)}
                    width={80}
                    height={80}
                    alt="avatar"
                    className="bg-white"
                  />
                ) : (
                  <UserCircleIcon className="w-10 h-10 bg-white" />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/account/profile">Profile</Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button
                  onClick={async () => {
                    await fetch('/api/auth/sign-out');
                    router.push('/');
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="btn btn-ghost" href="/sign-in">
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
