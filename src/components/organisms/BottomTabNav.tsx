'use client';

import { usePathname, useRouter } from 'next/navigation';
import { TABS } from '@/constants/BottomTabNav';
import { BottomTabNavBtn } from '../molecules';

type TabName = keyof typeof TABS;
type RouteName = (typeof TABS)[TabName]['route'];

export default function BottomTabNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navigateToTab = (route: RouteName) => router.replace(route);

  return (
    <nav className='border-black-626/15 fixed right-0 bottom-0 left-1/2 z-50 flex w-full -translate-x-1/2 items-center justify-around rounded-t-[10px] border-t bg-white py-2 shadow-[0_0_5px_rgba(0,0,0,0.25)] sm:w-sm'>
      {Object.entries(TABS).map(([tabName, { route }]) => {
        const isSelected = pathname === route;

        return (
          <BottomTabNavBtn
            key={tabName}
            tabName={tabName as TabName}
            isSelected={isSelected}
            onClick={() => navigateToTab(route)}
          />
        );
      })}
    </nav>
  );
}
