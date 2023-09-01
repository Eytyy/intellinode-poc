import React from 'react';
import type { Message } from '@/lib/validators/message';
import { ChatMessage } from './chat-message';

export const ChatPanel = ({
  chat,
  initialMessage,
}: {
  chat?: Message[];
  initialMessage?: Message | null;
}) => {
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  if (chat) {
    return (
      <>
        {chat.map((message) => (
          <ChatMessage key={message._id} {...message} />
        ))}
        <div ref={endRef} />
      </>
    );
  }

  if (initialMessage) {
    return <ChatMessage {...initialMessage} />;
  }

  return null;
};
