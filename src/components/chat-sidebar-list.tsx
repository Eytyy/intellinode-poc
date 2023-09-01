import { useChat } from '@/store/useChat';
import Link from 'next/link';
import React from 'react';

type Props = {};

export default function ChatSidebarList({}: Props) {
  const conversations = useChat((state) => state.conversations);
  return (
    <div className="space-y-4">
      {conversations.map((conversation) => {
        return (
          <div
            key={conversation._id}
            className="px-4 py-2 bg-secondary hover:text-accent hover:bg-accent-foreground rounded-md"
          >
            <Link
              className="block"
              href={`/chat/${conversation._id}`}
            >
              {conversation.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
