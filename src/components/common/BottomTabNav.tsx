'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  TABS,
  TAB_DEFAULT_COLOR,
  TAB_ICON_SIZE,
  TAB_SELECTED_COLOR,
  TAB_TEXT_SIZE,
} from '@/constants/common/BottomTabNav';
import { Txt } from '../atoms';

export default function BottomTabNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className='border-black-626/15 fixed bottom-0 z-50 flex w-full items-center justify-around rounded-t-[20px] border-t bg-white py-2 shadow-[0_0_5px_rgba(0,0,0,0.25)] sm:w-sm'>
      {TABS.map(({ label, route, icon: Icon }) => {
        const isSelected = pathname === route;

        return (
          <button className='flex flex-col items-center px-6' onClick={() => router.replace(route)}>
            <Icon
              size={TAB_ICON_SIZE}
              color={isSelected ? TAB_SELECTED_COLOR : TAB_DEFAULT_COLOR}
            />
            <Txt size={TAB_TEXT_SIZE} className={isSelected ? 'text-green-49d' : 'text-gray-070'}>
              {label}
            </Txt>
          </button>
        );
      })}
    </nav>
  );
}
