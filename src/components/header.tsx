import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

import { User } from './user';
import Nav from './nav';
import { Hexagon } from 'lucide-react';

type Props = {
  className?: string;
};

export default function Header({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-[60] flex items-center justify-between w-full h-16 px-4 border-b shrink-0 backdrop-blur-xl',
          className
        )}
      >
        <div className="flex gap-10 items-center">
          <Link className="flex gap-10 items-center" href="/">
            <div className="px-2">
              <Hexagon />
            </div>
            <div>/</div>
            <h1 className="font-bold text-lg">PoC</h1>
          </Link>
          <Nav />
        </div>

        {children}
        <User />
      </header>
    </>
  );
}
