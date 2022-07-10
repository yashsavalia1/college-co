import { Category, FullAddress } from "@prisma/client";

export type DisplayListing = {
    id: string;
    title: string;
    price: number;
    description: string | null;
    categories: Category[];
    address: FullAddress | null;
    pictureLink : string
}
