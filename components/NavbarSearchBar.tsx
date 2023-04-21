import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function NavbarSearchBar() {
  return (
    <form className="input-group" action="/listings/search">
      <input type="text" placeholder="Search" className="input input-bordered" name="query" />
      <button className="btn btn-square" type="submit">
        <MagnifyingGlassIcon className="w-6 h-6"></MagnifyingGlassIcon>
      </button>
    </form>
  );
}
