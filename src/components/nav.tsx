import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import ActiveLink from './active-link';
const links = [
  {
    _id: 'nav-1',
    href: '/chat',
    label: 'Chat',
  },
  {
    _id: 'nav-2',
    href: '/blog',
    label: 'Blog',
  },
];

export default function Nav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map((link) => (
          <NavigationMenuItem key={link._id}>
            <ActiveLink
              link={link}
              renderCustomComponent={({ active }) => (
                <NavigationMenuLink
                  active={active}
                  className={navigationMenuTriggerStyle()}
                >
                  {link.label}
                </NavigationMenuLink>
              )}
            />
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
