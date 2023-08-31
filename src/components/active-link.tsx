import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function ActiveLink({
  link,
  renderCustomComponent,
}: PropsWithChildren<{
  link: { href: string; label: string; as?: string };
  renderCustomComponent?: ({
    active,
  }: {
    active: boolean;
  }) => JSX.Element;
}>) {
  const { asPath, isReady } = useRouter();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(
        (link.as || link.href) as string,
        location.href
      ).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;
      setActive(linkPathname === activePathname);
    }
  }, [asPath, isReady, link.as, link.href]);

  return (
    <Link href={link.href} passHref legacyBehavior>
      {renderCustomComponent
        ? renderCustomComponent({ active })
        : link.label}
    </Link>
  );
}
