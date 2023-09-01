import React, { PropsWithChildren } from 'react';

import { Label } from './ui/label';
import { Switch } from './ui/switch';
import Header from './header';
import Container from './container';
import { useBlog } from '@/store/blog';

type Props = {};

export default function BlogLayout({
  children,
}: PropsWithChildren<Props>) {
  return (
    <Container>
      <BlogHeader />
      <main className="p-10">{children}</main>
    </Container>
  );
}

function BlogHeader() {
  const ghostMode = useBlog((state) => state.ghostMode);
  const toggleMode = useBlog((state) => state.toggleMode);

  return (
    <Header>
      <div className="flex items-center space-x-2">
        <Switch
          id="ghost-mode"
          checked={ghostMode}
          onCheckedChange={toggleMode}
        />
        <Label htmlFor="ghost-mode">Ghost Mode</Label>
      </div>
    </Header>
  );
}
