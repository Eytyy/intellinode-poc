import React from 'react';
import Chat from '@/components/chat';
import ChatLayout from '@/components/chat-layout';
import { useChat } from '@/store/useChat';

export default function ChatPage() {
  return <Chat />;
}

ChatPage.getLayout = function getLayout(page: React.ReactElement) {
  return <ChatLayout {...page.props}>{page}</ChatLayout>;
};
