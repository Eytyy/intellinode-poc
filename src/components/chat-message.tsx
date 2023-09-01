import React from 'react';
import Image from 'next/image';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useUser } from '@auth0/nextjs-auth0/client';
import { cn } from '@/lib/utils';

import type { Message } from '@/lib/validators/message';

export const ChatMessage = ({ role, content }: Message) => {
  const isUser = role === 'user';
  return (
    <div className={'flex gap-4 px-10 pb-10 items-top w-full'}>
      <ChatAvatar isUser={isUser} />
      <div className="mt-2 flex-1 pb-10 border-b-[1px] border-faded">
        {isUser ? (
          <>{content}</>
        ) : (
          <ReactMarkdown className="prose">{content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
};

const ChatAvatar = ({ isUser }: { isUser: boolean }) => {
  const { user, isLoading, error } = useUser();
  const showAvatart = !isLoading && !error && isUser && user?.picture;
  return (
    <div
      className={cn(
        'flex-grow-0 flex-shrink-0 w-10 h-10 rounded-full border-2 border-faded relative',
        isUser ? 'bg-muted' : 'bg-foreground'
      )}
    >
      {showAvatart && (
        <Image
          src={user.picture!}
          alt={user?.name || 'Profile Picture'}
          layout="fill"
          objectFit="cover"
          sizes="40px"
        />
      )}
    </div>
  );
};
