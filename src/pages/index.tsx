import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-full flex gap-10 items-center justify-center px-10">
      <CardLink href="/chat" title="Chatbot" />
      <CardLink href="/blog" title="Blog" />
    </div>
  );
}

function CardLink({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="w-1/3 py-20 px-10 border-2 border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] rounded-2xl flex items-center justify-center"
    >
      {title}
    </Link>
  );
}
