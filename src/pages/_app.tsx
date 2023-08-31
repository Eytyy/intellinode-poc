import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { Inter } from 'next/font/google';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { Layout } from '@/components/layouts';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <UserProvider>
      <ReactQueryProvider>
        <div className={`${inter.className}`}>
          {getLayout(<Component {...pageProps} />)}
        </div>
      </ReactQueryProvider>
    </UserProvider>
  );
}
