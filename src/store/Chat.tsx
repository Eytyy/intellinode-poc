import { createContext, useState } from 'react';

type Chat = {
  messages: {
    role: string;
    content: string;
    _id: string;
  }[];
  sendMessage: (message: string) => void;
};

const ChatContext = createContext<Chat>({
  messages: [],
  sendMessage: () => {},
});

export const ChatProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<
    {
      role: string;
      content: string;
      _id: string;
    }[]
  >([]);

  const sendMessage = async (message: string) => {
    const res = await fetch('/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: message,
          },
          ...messages,
        ],
      }),
    });
    const data = await res.json();
    setMessages(data);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return ChatContext;
};
