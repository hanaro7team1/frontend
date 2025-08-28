import { DialogProps } from '@radix-ui/react-dialog';
import { PropsWithChildren } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Txt } from '../atoms';

export default function BottomSheet({ children, ...props }: PropsWithChildren & DialogProps) {
  return (
    <Sheet {...props}>
      <SheetTrigger>
        <div className='bg-black-626/45 mt-1 rounded-full p-0.5'>
          <Txt size={18} className='text-white'>
            변경하기
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
