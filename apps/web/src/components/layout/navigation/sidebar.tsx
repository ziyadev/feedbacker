'use client';
import { siteConfig } from '@/app/siteConfig';
import { cx, focusRing } from '@/lib/utils';
import {
  RiFlashlightLine,
  RiHome2Line,
  RiInbox2Line,
  RiKey2Line,
  RiSettings5Line,
  RiWebhookLine,
} from '@remixicon/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileSidebar from './MobileSidebar';
import {
  WorkspacesDropdownDesktop,
  WorkspacesDropdownMobile,
} from './SidebarWorkspacesDropdown';
import { UserProfile } from './UserProfile';

export const navigation = [
  { name: 'Overview', href: siteConfig.baseLinks.overview, icon: RiHome2Line },
  {
    name: 'Quickstart',
    href: siteConfig.baseLinks.quickstart,
    icon: RiFlashlightLine,
  },
  {
    name: 'Inbox',
    href: siteConfig.baseLinks.feedback,
    icon: RiInbox2Line,
  },
  {
    name: 'Webhooks',
    href: siteConfig.baseLinks.webhooks,
    icon: RiWebhookLine,
  },
  { name: 'API Keys', href: siteConfig.baseLinks.apikeys, icon: RiKey2Line },
  {
    name: 'Settings',
    href: siteConfig.baseLinks.settings,
    icon: RiSettings5Line,
  },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (itemHref: string) => {
    if (itemHref === siteConfig.baseLinks.settings) {
      return pathname.startsWith('/settings');
    }
    return pathname === itemHref || pathname.startsWith(itemHref);
  };
  return (
    <>
      {/* sidebar (lg+) */}
      <nav className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <aside className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <WorkspacesDropdownDesktop />
          <nav
            aria-label="core navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-0.5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cx(
                      isActive(item.href)
                        ? 'bg-blue-500 dark:bg-blue-500 text-white dark:text-white hover:bg-blue-600 dark:hover:bg-blue-600'
                        : 'text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-900/60',
                      'flex items-center gap-x-2.5 rounded-md px-2 py-2 text-sm font-medium transition  ',
                      focusRing
                    )}
                  >
                    <item.icon className="size-4 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto">
            <UserProfile />
          </div>
        </aside>
      </nav>
      {/* top navbar (xs-lg) */}
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-2 shadow-sm sm:gap-x-6 sm:px-4 lg:hidden dark:border-gray-800 dark:bg-gray-950">
        <div className="flex items-center gap-1 sm:gap-2">
          <WorkspacesDropdownMobile />
          <UserProfile />
        </div>
        <MobileSidebar />
      </div>
    </>
  );
}
