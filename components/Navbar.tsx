import logo from '@assets/CollegeCo.png'
import Image from 'next/image'
import Link from 'next/link'
import { Bars3Icon } from '@heroicons/react/24/solid'
import NavbarSearchBar from './NavbarSearchBar'

export default function Navbar() {
  return (
    <nav className="navbar bg-gray-300">

      <div className="md:hidden">
        <label htmlFor="main-drawer" className="btn btn-square btn-ghost">
          <Bars3Icon className="w-6 h-6"></Bars3Icon>
        </label>
      </div>

      <div className="flex-1">
        <Link
          href="/"
          className="btn btn-ghost normal-case text-xl content-center"
        >
          <div className="w-10 md:mr-4 mr-0 align-middle">
            <Image src={logo} alt="Logo" style={{ objectFit: 'contain' }} />
          </div>
          <span className="text-2xl md:block hidden">CollegeCo</span>
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
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image src="https://placeimg.com/80/80/people" width={80} height={80} alt="" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>

    </nav>
  )
}
