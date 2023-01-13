import type { AppProps } from 'next/app';
import Head from 'next/head';
import { BaseAuthStore, LocalAuthStore } from 'pocketbase';
import { createContext } from 'react';
import '../styles/globals.css';

export const AuthContext = createContext(null as BaseAuthStore | null);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="CollegeCo, the online marketplace built for college students." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthContext.Provider value={pageProps.authStore ?? null}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </>
  );
}
