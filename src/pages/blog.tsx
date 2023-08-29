import { Inter } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

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
      <div className="py-10">
        {chat.map((message) => (
          <div
            key={message._id}
            className={clsx('flex gap-4 px-10 pb-10 items-top')}
          >
            <div
              className={clsx(
                'flex-grow-0 flex-shrink-0 w-10 h-10 rounded-full border-2 border-[rgba(255,255,255,0.1)]',
                message.role === 'user' ? 'bg-blue-500' : 'bg-black'
              )}
            ></div>
            <div
              className={clsx(
                'mt-2 flex-1 pb-10',
                'border-b-[1px] border-[rgba(255,255,255,0.1)]'
              )}
            >
              <span className="font-semibold mr-2">
                {message.role.charAt(0).toUpperCase() +
                  message.role.slice(1)}
              </span>
              {message.content}
            </div>
            <div ref={endRef} />
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 w-full p-10 left-0 z-20">
        {isLoading && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-sm">
            Generating Response ...
          </div>
        )}
        <div className="flex gap-2 max-w-4xl mx-auto px-10">
          <input
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onSubmit(event);
              }
            }}
            placeholder="Send a message"
            ref={input}
            type="text"
            className="border-2 flex-1 rounded-md p-4 bg-pageBG text-pageText border-[rgba(255,255,255,0.1)]"
          />
          <button
            className="bg-blue-500 w-20 flex-grow-0 rounded-md"
            onClick={onSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
