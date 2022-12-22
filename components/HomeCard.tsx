
import Image from "next/image"
import Listing from "../types/listing"
import Link from "next/link"

const HomeCard: React.FC<{ className?: string, listing?: Listing }> = ({ className = 'w-96', listing }) => {
  return (
    <Link href={`/listing/${listing?.id}`} className="hover:scale-[102%] transition-transform">
      <div className={`card ${className} bg-base-100 shadow-xl`}>
        <figure><Image src="https://placeimg.com/400/225/arch" width={400} height={225} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">
            <div>{listing?.title}</div>
            <div className="badge badge-secondary">NEW</div>
            <div className="ml-auto">${listing?.price}</div>
          </h2>
          <p>{listing?.description}</p>
          <div className="card-actions justify-end">
            {listing?.tags?.map((tag, i) => <div key={i} className="badge badge-outline">{tag}</div>)}
          </div>
          <div className="footer">
            <>
              Posted {!(listing?.created instanceof Date) ?
                new Date(listing?.created as string).toLocaleDateString()
                :
                listing.created}
            </>
          </div>
        </div>
      </div>
    </Link>)
}

export default HomeCard