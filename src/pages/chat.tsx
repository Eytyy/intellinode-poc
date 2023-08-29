import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

type ChatMessage = {
  role: string;
  content: string;
  _id: string;
};

async function PostChatMessage(props: {
  languageModel: 'openai' | 'replicate';
  messages: ChatMessage[];
}) {
  const { data } = await axios.post(
    `/api/chatbot/${props.languageModel}`,
    {
      messages: props.messages,
    }
  );
  return data as ChatMessage[];
}

export default function Chat() {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [languageModel, setLanguageModel] = useState<
    'openai' | 'replicate'
  >('openai');

  const input = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: PostChatMessage,
    onSuccess: (data) => {
      setChat((chat) => [...chat, ...data]);
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

    setChat((chat) => [...chat, message]);

    mutate({
      languageModel,
      messages: [...chat, message],
    });
    input.current.value = '';
  }

  const switchModel = (value: 'openai' | 'replicate') => {
    setLanguageModel(value);
    setChat([]);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  return (
    <>
      <main
        className={`grid grid-rows-[1fr,min-content] min-h-[calc(100vh-108px)] relative max-w-4xl w-full mx-auto`}
      >
        <div className="py-10">
          {chat.map((message) => (
            <div
              key={message._id}
              className={clsx(
                'flex gap-4 px-10 pb-10 items-top w-full'
              )}
            >
              <div
                className={clsx(
                  'flex-grow-0 flex-shrink-0 w-10 h-10 rounded-full border-2 border-faded',
                  message.role === 'user' ? 'bg-blue' : 'bg-pageText'
                )}
              ></div>
              <div
                className={clsx(
                  'mt-2 flex-1 pb-10',
                  'border-b-[1px] border-faded'
                )}
              >
                <span className="font-semibold mr-2">
                  {message.role.charAt(0).toUpperCase() +
                    message.role.slice(1)}
                </span>
                {message.content}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <Drawer
          ref={input}
          switchModel={switchModel}
          isLoading={isLoading}
          languageModel={languageModel}
          onSubmit={onSubmit}
        />
      </main>
    </>
  );
}

const Drawer = React.forwardRef<
  HTMLInputElement,
  {
    switchModel: (value: 'openai' | 'replicate') => void;
    isLoading: boolean;
    languageModel: 'openai' | 'replicate';
    onSubmit: () => void;
  }
>(function Drawer(
  { switchModel, isLoading, languageModel, onSubmit },
  ref
) {
  return (
    <div className="sticky bottom-0 w-full p-10 left-0 z-20">
      {isLoading && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-sm">
          Generating Response ...
        </div>
      )}
      <div className="max-w-4xl mx-auto px-10">
        <div className="flex gap-2 ">
          <input
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onSubmit();
              }
            }}
            placeholder="Send a message"
            ref={ref}
            type="text"
            className="border-2 flex-1 rounded-md p-4 bg-pageBG text-pageText border-faded"
          />
          <button
            className="bg-pageText text-pageBG w-20 flex-grow-0 rounded-md"
            onClick={onSubmit}
          >
            Send
          </button>
        </div>

        <div className="mt-4">
          <div className="flex gap-4 text-sm">
            <ModelSwitch
              onClick={switchModel}
              title="OpenAi"
              value="openai"
              active={languageModel === 'openai'}
            />
            <ModelSwitch
              onClick={switchModel}
              title="Replicate"
              value="replicate"
              active={languageModel === 'replicate'}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

function ModelSwitch({
  title,
  value,
  active,
  onClick,
}: {
  title: string;
  value: 'openai' | 'replicate';
  active: boolean;
  onClick: (value: 'openai' | 'replicate') => void;
}) {
  return (
    <button
      role="button"
      className={clsx(
        'border-[2px] rounded-md px-4 py-1',
        active && 'bg-pageText text-pageBG'
      )}
      onClick={() => onClick(value)}
    >
      {title}
    </button>
  );
}
