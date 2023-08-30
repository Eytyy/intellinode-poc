import { Inter } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

async function PostChatMessage(props: { messages: ChatMessage[] }) {
  const { data } = await axios.post('/api/chatbot', {
    messages: props.messages,
  });
  return data;
}

type ChatMessage = {
  role: string;
  content: string;
  _id: string;
};

export default function Chat() {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: PostChatMessage,
    onSuccess: (data) => {
      setChat((chat) => [...chat, ...data]);
    },
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  function onSubmit(event: any) {
    event.preventDefault();
    const inputText = input.current?.value;

    if (!inputText) return void 0;

    const message = {
      role: 'user',
      content: inputText,
      _id: nanoid(),
    };

    setChat((chat) => [...chat, message]);

    mutate({
      messages: [...chat, message],
    });
    input.current.value = '';
  }

  return (
    <main className={`min-h-screen relative max-w-4xl mx-auto`}>
      <input type="text" />
      <input type="text" />
      <input type="text" />
    </main>
  );
}
