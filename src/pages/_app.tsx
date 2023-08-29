import ReactQueryProvider from '@/providers/ReactQueryProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`min-h-screen grid grid-rows-[min-content_auto] relative ${inter.className}`}
    >
      <ReactQueryProvider>
        <header className="p-10 sticky top-0 z-10 backdrop-blur-md">
          <Link href="/">
            <h1 className="font-bold text-lg">Intellinode PoC</h1>
          </Link>
        </header>
        <Component {...pageProps} />
      </ReactQueryProvider>
    </div>
  );
}
