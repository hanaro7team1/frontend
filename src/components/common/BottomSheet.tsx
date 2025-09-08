'use client';

import { DialogProps } from '@radix-ui/react-dialog';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { getStyleAndtextSize } from '@/utils/common/bottomSheetTrigger';
import { Txt } from '../atoms';

export default function BottomSheet({ children, ...props }: PropsWithChildren & DialogProps) {
  const pathname = usePathname();
  const { btnStyle, textSize, text } = getStyleAndtextSize(pathname);

  return (
    <Sheet {...props}>
      <SheetTrigger asChild>
        <div
          className={cn(
            'bg-black-626/45 flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full p-0.5 px-3',
            btnStyle,
          )}
        >
          <Txt size={textSize} align='center' className='text-white'>
            {text ?? '변경하기'}
          </Txt>
        </div>
      </SheetTrigger>

      <SheetContent
        side='bottom'
        className='left-1/2 z-100 w-full -translate-x-1/2 rounded-t-[20px] bg-white sm:w-sm'
      >
        {children}
      </SheetContent>
    </Sheet>
  );
}
