import { XMarkIcon } from '@heroicons/react/24/solid';
import Navbar from './Navbar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode[];
}) {
  return (
    <>
      <div className="drawer">
        <input id="main-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <Navbar />
          <main>{children}</main>
        </div>
        <div className="drawer-side">
          <label htmlFor="main-drawer" className="drawer-overlay"></label>
          <ul className="menu pt-16 px-8 max-w-max bg-base-100">
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>

            <label
              htmlFor="main-drawer"
              className="absolute right-4 top-4 hover:cursor-pointer hover:bg-gray-500 transition-colors duration-200 rounded-md"
            >
              <XMarkIcon className="w-8 h-8 hover:text-gray-200 transition-colors duration-200" />
            </label>
          </ul>
        </div>
      </div>
    </>
  );
}
