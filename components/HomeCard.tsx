import Image from 'next/image';
import Link from 'next/link';
import Listing from '../types/listing';

const HomeCard: React.FC<{
  className?: string;
  listing?: Listing;
  thumbUrl: string;
}> = ({ className = 'w-96', listing, thumbUrl }) => {
  return (
    <Link
      href={`/listings/${listing?.id}`}
      className="hover:scale-[102%] transition-transform"
    >
      <div className={`card ${className} bg-base-100 shadow-xl`}>
        {thumbUrl && (
          <figure className="h-44 relative border-2">
            <Image
              src={thumbUrl}
              alt={listing?.images ? listing?.images[0] : 'thumb'}
              fill
              sizes="100vw,"
              style={{ objectFit: 'cover' }}
            />
          </figure>
        )}
        <div className="card-body">
          <h2 className="card-title">
            <div>{listing?.title}</div>
            <div className="badge badge-secondary">NEW</div>
            <div className="ml-auto">${listing?.price}</div>
          </h2>
          <p>{listing?.description}</p>
          <div className="card-actions justify-end">
            {listing?.tags?.map((tag, i) => (
              <div key={i} className="badge badge-outline">
                {tag}
              </div>
            ))}
          </div>
          <div className="footer">
            <>
              Posted{' '}
              {listing?.created instanceof Date
                ? listing.created
                : new Date(listing?.created as string).toLocaleDateString()}
            </>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeCard;
