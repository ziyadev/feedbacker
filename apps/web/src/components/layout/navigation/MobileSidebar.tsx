import { siteConfig } from '@/app/siteConfig';
import { cx, focusRing } from '@/lib/utils';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@feedbacker/ui';
import { RiMenuLine } from '@remixicon/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from './sidebar';

export default function MobileSidebar() {
  const pathname = usePathname();
  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings) {
      return pathname.startsWith('/settings');
    }
    return pathname === itemHref || pathname.startsWith(itemHref);
  };
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            aria-label="open sidebar"
            className="group flex items-center rounded-md p-2 text-sm font-medium hover:bg-gray-100 data-[state=open]:bg-gray-400/10 hover:dark:bg-gray-400/10"
          >
            <RiMenuLine
              className="size-6 shrink-0 sm:size-5"
              aria-hidden="true"
            />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Retail Analytics</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <nav
              aria-label="core mobile navigation links"
              className="flex flex-1 flex-col space-y-10"
            >
              <ul role="list" className="space-y-1.5">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <DrawerClose asChild>
                      <Link
                        href={item.href}
                        className={cx(
                          isActive(item.href)
                            ? 'bg-blue-500 dark:bg-blue-500 text-white dark:text-white hover:bg-blue-600 dark:hover:bg-blue-600'
                            : 'text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-900/60',
                          'flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-base font-medium transition sm:text-sm ',
                          focusRing
                        )}
                      >
                        <item.icon
                          className="size-5 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </DrawerClose>
                  </li>
                ))}
              </ul>
            </nav>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
