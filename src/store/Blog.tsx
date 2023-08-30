import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

type Blog = {
  ghostMode: boolean;
  toggleMode: () => void;
};

const BlogContext = createContext<Blog>({
  ghostMode: false,
  toggleMode: () => {},
});

export const BlogProvider = ({ children }: PropsWithChildren) => {
  const [ghostMode, setGhostMode] = useState<boolean>(false);

  const toggleMode = useCallback(() => {
    setGhostMode((prev) => !prev);
  }, []);

  return (
    <BlogContext.Provider value={{ ghostMode, toggleMode }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
