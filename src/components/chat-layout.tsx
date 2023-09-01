import React, { PropsWithChildren } from 'react';
import Container from './container';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChatSidebar } from './chat-sidebar';
import ChatSidebarList from './chat-sidebar-list';
import { useChat } from '@/store/useChat';
import { User } from './user';
import Nav from './nav';

type Props = {};

export default function ChatLayout({
  children,
}: PropsWithChildren<Props>) {
  const isSidebarOpen = useChat((state) => state.isSidebarOpen);

  return (
    <Container>
      <Header />
      <main
        className={cn(
          isSidebarOpen ? 'pl-[300px]' : 'pl-0',
          'transition-all duration-300 ease-in-out'
        )}
      >
        {children}
      </main>
    </Container>
  );
}

function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        'sticky top-0 z-[60] flex items-center justify-between w-full h-16 px-4 border-b shrink-0 backdrop-blur-xl',
        className
      )}
    >
      <div className="flex items-center">
        <div className="flex items-center justify-end gap-10">
          <ChatSidebar>
            <ChatSidebarList />
          </ChatSidebar>
          <div className="flex gap-10 items-center">
            <div>/</div>
            <Link href="/">
              <h1 className="font-bold text-lg">PoC</h1>
            </Link>
            <Nav />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <User />
      </div>
    </header>
  );
}
