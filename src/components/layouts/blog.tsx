import React, { PropsWithChildren } from 'react';
import Link from 'next/link';

import { BlogProvider, useBlog } from '@/store/Blog';

import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import Header from '../header';
import Container from '../container';

type Props = {};

export default function BlogLayout({
  children,
}: PropsWithChildren<Props>) {
  return (
    <BlogProvider>
      <Container>
        <BlogHeader />
        <main>{children}</main>
      </Container>
    </BlogProvider>
  );
}

function BlogHeader() {
  const { ghostMode, toggleMode } = useBlog();

  return (
    <Header>
      <div className="flex items-center space-x-2">
        <Switch
          disabled
          id="ghost-mode"
          checked={ghostMode}
          onCheckedChange={toggleMode}
        />
        <Label htmlFor="ghost-mode">Ghost Mode</Label>
      </div>
    </Header>
  );
}
