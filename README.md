# CollegeCo

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication

- ### AuthProvider

  Allows access to the authstore within our app. Gets the authstore from getServerSideProps on each individual page (i.e. `getServerSideProps` must return the authStore on that page).

- ### usePocketBase
  Gets the pocketbase instance using the authstore. You must call `getServerSideProps` on the page and return the AuthStore.

## TODO

- View Listings
- Search listings
- authentication (school email)
- messages
- tags
- create post
