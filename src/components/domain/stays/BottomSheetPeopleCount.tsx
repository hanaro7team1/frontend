'use client';

import { CircleMinus, CirclePlus } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Txt } from '@/components/atoms';
import { BottomSheet } from '@/components/common';
import { SheetClose } from '@/components/ui/sheet';

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hasTrigger?: boolean;
};

export default function BottomSheetPeopleCount({ open, onOpenChange, hasTrigger }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const prevSearchParam = searchParams.get('peopleCount');

  const [count, setCount] = useState(+(prevSearchParam ?? 2));

  const handleDone = () => {
    const params = new URLSearchParams(searchParams);
    params.set('peopleCount', count + '');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} hasTrigger={hasTrigger}>
      <div className='flex flex-col gap-10 p-4'>
        <Txt size={24} align='center'>
          숙박 인원을 선택하세요
        </Txt>

        <div className='flex justify-between px-20'>
          <button onClick={() => setCount((prev) => Math.max(1, prev - 1))}>
            <CircleMinus size={40} color='var(--code-theme6)' />
          </button>
          <Txt size={30}>{count} 명</Txt>
          <button onClick={() => setCount((prev) => prev + 1)}>
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
