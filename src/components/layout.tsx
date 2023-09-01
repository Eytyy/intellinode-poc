import React, { PropsWithChildren } from 'react';
import Header from './header';
import Container from './container';

type Props = {};

export default function Layout({
  children,
}: PropsWithChildren<Props>) {
  return (
    <Container>
      <Header />
      <main>{children}</main>
    </Container>
  );
}
