import { Record } from 'pocketbase';

type Listing = {
  id: string;
  title: string;
  description?: string;
  images?: string[];
  price: number;
  tags?: string[];
  user?: {};
  published: boolean;
  created: Date | string;
  updated?: Date | string;
};

export default Listing;
export type NewListing = Omit<Listing, 'id'>;
export type ListingRecord = Listing & Record;
