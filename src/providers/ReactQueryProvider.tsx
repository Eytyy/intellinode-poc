import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export default function ReactQueryProvider({
  children,
}: PropsWithChildren) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
}
