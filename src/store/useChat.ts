import { Message } from '@/lib/validators/message';
import { create } from 'zustand';

type ChatState = {
  conversations: {
    _id: string;
    title: string;
    messages: Message[];
  }[];
  isSidebarOpen: boolean;
  getConversationById: (
    _id?: string
  ) => ChatState['conversations'][number] | undefined;
  createConversation: (
    _id: string,
    title: string,
    messages: Message[]
  ) => void;
  deleteConversation: (_id: string) => void;
  addMessage: (conversationID: string, message: Message) => void;
  toggleSidebar: () => void;
};

export const useChat = create<ChatState>((set, get) => ({
  conversations: [],
  isSidebarOpen: false,
  getConversationById: (_id) => {
    return get().conversations.find(
      (conversation) => conversation._id === _id
    );
  },
  createConversation: (_id, title, messages) => {
    set((state) => ({
      conversations: [
        ...state.conversations,
        { _id, title, messages },
      ],
    }));
  },
  deleteConversation: (_id) => {
    set((state) => ({
      conversations: state.conversations.filter(
        (conversation) => conversation._id !== _id
      ),
    }));
  },
  addMessage: (id, message) => {
    set((state) => ({
      conversations: state.conversations.map((conversation) => {
        if (conversation._id === id) {
          return {
            ...conversation,
            messages: [...conversation.messages, message],
          };
        }
        return conversation;
      }),
    }));
  },
  toggleSidebar: () => {
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    }));
  },
}));
