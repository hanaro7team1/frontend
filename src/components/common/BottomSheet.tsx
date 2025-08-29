import { DialogProps } from '@radix-ui/react-dialog';
import { PropsWithChildren } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Txt } from '../atoms';

type TriggerBtnType = 'default' | 'detail';

type Props = {
  triggerBtnType?: TriggerBtnType;
};

export default function BottomSheet({
  children,
  triggerBtnType = 'default',
  ...props
}: PropsWithChildren & DialogProps & Props) {
  let triggerButton = null;

  if (triggerBtnType === 'default') {
    // 기본 버튼 (/stays 페이지 필터)
    triggerButton = (
      <div className='bg-black-626/45 mt-1 flex cursor-pointer items-center justify-center rounded-full p-0.5 px-3'>
        <Txt size={18} className='text-white'>
          변경하기
        </Txt>
      </div>
    );
  } else if (triggerBtnType === 'detail') {
    // 상세 버튼 (상세 페이지 필터)
    triggerButton = (
      <div className='bg-black-626/45 flex flex-shrink-0 cursor-pointer items-center justify-center rounded-full px-4 py-1.5'>
        <Txt size={16} className='text-white'>
          변경하기
        </Txt>
      </div>
    );
  }

  return (
    <Sheet {...props}>
      {triggerButton && <SheetTrigger asChild>{triggerButton}</SheetTrigger>}

      <SheetContent
        side='bottom'
        className='left-1/2 z-100 w-full -translate-x-1/2 rounded-t-[20px] bg-white sm:w-sm'
      >
        {children}
      </SheetContent>
    </Sheet>
  );
}
