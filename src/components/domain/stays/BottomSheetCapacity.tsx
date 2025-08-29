'use client';

import { CircleMinus, CirclePlus } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Txt } from '@/components/atoms';
import { BottomSheet } from '@/components/common';
import { SheetClose } from '@/components/ui/sheet';

type Props = {
  newCapacity: number;
  setNewCapacity: Dispatch<SetStateAction<number>>;
};

export default function BottomSheetCapacity({ newCapacity, setNewCapacity }: Props) {
  const handleDone = () => {
    setNewCapacity(newCapacity);
  };

  return (
    <BottomSheet>
      <div className='flex flex-col gap-10 p-4'>
        <Txt size={24} align='center'>
          최대 수용 인원을 선택하세요
        </Txt>

        <div className='flex justify-between px-20'>
          <button onClick={() => setNewCapacity((prev) => Math.max(1, prev - 1))}>
            <CircleMinus size={40} color='var(--code-theme6)' />
          </button>
          <Txt size={30}>{newCapacity} 명</Txt>
          <button onClick={() => setNewCapacity((prev) => prev + 1)}>
            <CirclePlus size={40} color='var(--code-theme6)' />
          </button>
        </div>

        <SheetClose
          onClick={handleDone}
          className='bg-green-49d flex h-[50px] w-full items-center justify-center rounded-[10px] py-[11px]'
        >
          <Txt className='text-white'>선택 완료</Txt>
        </SheetClose>
      </div>
    </BottomSheet>
  );
}
