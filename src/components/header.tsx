import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

type Props = {
  className?: string;
};

export default function Header({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <header
      className={cn(
        'py-10 sticky top-0 z-10 backdrop-blur-md flex justify-between',
        className
      )}
    >
      <Link href="/">
        <h1 className="font-bold text-lg">Intellinode PoC</h1>
      </Link>
      {children}
    </header>
  );
}
