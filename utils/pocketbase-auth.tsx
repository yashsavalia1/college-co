import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';
import PocketBase, { BaseAuthStore } from 'pocketbase';
import { createContext, ReactNode, useContext } from 'react';

const AuthContext = createContext<BaseAuthStore | undefined>(undefined);

/**
 * Provider to wrap the app with to provide an auth store
 */
export const AuthProvider = ({ children, authStore }: { children: ReactNode; authStore: BaseAuthStore }) => {
  return <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>;
};

/**
 * Hook to get a PocketBase instance with an auth store
 */
export const usePocketBase = () => {
  return new PocketBase('https://college-co-db.fly.dev/', useContext(AuthContext));
};

export type AuthRequest =
  | NextApiRequest
  | (IncomingMessage & {
      cookies: NextApiRequestCookies;
    });

export type AuthResponse = ServerResponse;

/**
 * Initialize a PocketBase instance with an auth store
 */
export const initPocketBase = async (req: AuthRequest, res?: AuthResponse) => {
  const pb = new PocketBase('https://college-co-db.fly.dev/');

  // load the store data from the request cookie string
  pb.authStore.loadFromCookie(req.headers.cookie || '');

  // send back the default 'pb_auth' cookie to the client with the latest store state
  pb.authStore.onChange(() => {
    res?.setHeader('set-cookie', pb.authStore.exportToCookie());
  });

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    pb.authStore.isValid && (await pb.collection('users').authRefresh());
  } catch (_) {
    // clear the auth store on failed refresh
    pb.authStore.clear();
  }

  return pb;
};

export type AuthProps<T> = T & {
  authStore?: BaseAuthStore;
};
