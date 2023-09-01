import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

export const User = () => {
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
        <DropdownMenuContent align="start" className="z-[60]">
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

export function UserSkeleton() {
  return <Skeleton className="h-12 w-12 rounded-full" />;
}
