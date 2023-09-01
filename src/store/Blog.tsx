import { create } from 'zustand';

interface BlogState {
  ghostMode: boolean;
  toggleMode: () => void;
}

export const useBlog = create<BlogState>((set) => ({
  ghostMode: false,
  toggleMode: () => set((state) => ({ ghostMode: !state.ghostMode })),
}));
