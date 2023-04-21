import type { AppProps } from 'next/app';
import Head from 'next/head';
import PocketBase, { BaseAuthStore, LocalAuthStore } from 'pocketbase';
import { createContext } from 'react';
import '../styles/globals.css';
import { AuthProvider } from '../utils/pocketbase-auth';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="CollegeCo, the online marketplace built for college students." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider authStore={pageProps.authStore}>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
