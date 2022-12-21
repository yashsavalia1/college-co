
type Listing = {
  id: string,
  title: string,
  description: string,
  images: string[],
  price: number,
  tags: string[],
  user: {},
  published: boolean,
  created: Date | string,
  updated: Date | string,

}

export default Listing;