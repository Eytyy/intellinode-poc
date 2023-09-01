import React from 'react';
import Chat from '@/components/chat';
import ChatLayout from '@/components/chat-layout';
import { useRouter } from 'next/router';

export default function ConversationPage() {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <div>???</div>;
  }
  return <Chat _id={id as string} />;
}

ConversationPage.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <ChatLayout {...page.props}>{page}</ChatLayout>;
};
