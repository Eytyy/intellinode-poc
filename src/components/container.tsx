import React from 'react';

type Props = {};

export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-rows-[min-content_auto] relative p-10">
      {children}
    </div>
  );
}
