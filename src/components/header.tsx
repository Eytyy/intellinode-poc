import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { PropsWithChildren, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Skeleton } from './ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { useRouter } from 'next/router';
import ActiveLink from './active-link';

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
          'pb-10 sticky top-10 z-10 backdrop-blur-md flex justify-between',
          className
        )}
      >
        <div className="flex gap-10 items-center">
          <Link href="/">
            <h1 className="font-bold text-lg">Intellinode PoC</h1>
          </Link>
          <AppNavigation />
        </div>

        {children}
        <User />
      </header>
    </>
  );
}

const links = [
  {
    _id: 'nav-1',
    href: '/chat',
    label: 'Chat',
  },
  {
    _id: 'nav-2',
    href: '/blog',
    label: 'Blog',
  },
];

function AppNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map((link) => (
          <NavigationMenuItem key={link._id}>
            <ActiveLink
              link={link}
              renderCustomComponent={({ active }) => (
                <NavigationMenuLink
                  active={active}
                  className={navigationMenuTriggerStyle()}
                >
                  {link.label}
                </NavigationMenuLink>
              )}
            />
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function UserSkeleton() {
  return <Skeleton className="h-12 w-12 rounded-full" />;
}

const User = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <UserSkeleton />;
  if (error) return <div>{error.message}</div>;
  if (!user) {
    return <a href="/api/auth/login">Login</a>;
  }
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="h-8 w-8 rounded-full bg-foreground">
            {user.picture && (
              <Image
                src={user.picture}
                alt="Profile Picture"
                width={32}
                height={32}
              />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link className="block" href="/profile">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a className="block" href="/api/auth/logout">
              Logout
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
