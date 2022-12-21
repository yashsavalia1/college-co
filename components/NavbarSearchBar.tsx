import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function NavbarSearchBar() {
  return (
    <div className="input-group">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered"
      />
      <button className="btn btn-square">
        <MagnifyingGlassIcon className="w-6 h-6"></MagnifyingGlassIcon>
      </button>
    </div>
  )
}