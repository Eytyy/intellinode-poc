import React from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { nanoid } from 'nanoid';

import { Message } from '@/lib/validators/message';
import { useChat } from '@/store/useChat';
import { ChatPrompt } from '@/components/chat-prompt';
import { ChatPanel } from '@/components/chat-panel';
import { useRouter } from 'next/router';

async function PostPrompt(props: {
  languageModel: 'openai' | 'replicate';
  messages: Message[];
}) {
  const { data } = await axios.post(
    `/api/chatbot/${props.languageModel}`,
    {
      messages: props.messages,
    }
  );
  return data as Message[];
}
// This is a contrived example, we are just using the store to manage multiple chats.
// In production this would be handled by a database.

export default function Chat({ _id }: { _id?: string }) {
  const router = useRouter();

  // generate a chat id if one doesn't exist
  const idRef = React.useRef(nanoid());
  const conversationId = _id || idRef.current;

  const getConversation = useChat(
    (state) => state.getConversationById
  );
  const create = useChat((state) => state.createConversation);
  const addMessage = useChat((state) => state.addMessage);

  const conversation = getConversation(conversationId);

  const [languageModel, setLanguageModel] = React.useState<
    'openai' | 'replicate'
  >('openai');

  const [prompt, setPrompt] = React.useState<Message | null>(null);
  const input = React.useRef<HTMLTextAreaElement>(null);

  const switchModel = React.useCallback(
    (value: 'openai' | 'replicate') => {
      setLanguageModel(value);
    },
    []
  );

  // Prompt mutation
  const { mutate, isLoading } = useMutation({
    mutationFn: PostPrompt,
    onSuccess: (data) => {
      // if chat doesn't exist, create it
      if (typeof conversation === 'undefined') {
        const title: string = prompt
          ? prompt.content.slice(0, 40)
          : 'Untitled';
        create(
          conversationId,
          title,
          prompt ? [prompt, ...data] : data
        );
        router.push(`/chat/${conversationId}`);
      } else {
        // else add message to chat
        addMessage(conversation._id, prompt!);
        addMessage(conversation._id, data[0]);
      }
      setPrompt(null);
    },
  });

  function onSubmit() {
    const inputText = input.current?.value;
    if (!inputText) return void 0;

    const message = {
      role: 'user',
      content: inputText,
      _id: nanoid(),
    };

    setPrompt(message);

    mutate({
      languageModel,
      messages: conversation
        ? [...conversation.messages, message]
        : [message],
    });
    input.current.value = '';
  }

  return (
    <div className="grid grid-rows-[1fr,min-content] min-h-[calc(100vh-108px)] max-w-4xl w-full mx-auto relative">
      <div className="py-10">
        <ChatPanel
          chat={conversation?.messages}
          initialMessage={prompt}
        />
      </div>
      <ChatPrompt
        ref={input}
        switchModel={switchModel}
        isLoading={isLoading}
        languageModel={languageModel}
        onSubmit={onSubmit}
      />
    </div>
  );
}
