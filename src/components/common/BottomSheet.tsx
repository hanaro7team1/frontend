import { DialogProps } from '@radix-ui/react-dialog';
import { PropsWithChildren } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Txt } from '../atoms';

type Props = {
  hasTrigger?: boolean;
};

export default function BottomSheet({
  children,
  hasTrigger = true,
  ...props
}: PropsWithChildren & DialogProps & Props) {
  return (
    <Sheet {...props}>
      {hasTrigger && (
        <SheetTrigger asChild>
          <div className='bg-black-626/45 mt-1 flex cursor-pointer items-center justify-center rounded-full p-0.5 px-3'>
            <Txt size={18} className='text-white'>
              변경하기
            </Txt>
          </div>
        </SheetTrigger>
      )}
      <SheetContent
        side='bottom'
        className='left-1/2 z-100 w-full -translate-x-1/2 rounded-t-[20px] bg-white sm:w-sm'
      >
        {children}
      </SheetContent>
    </Sheet>
  );
}
