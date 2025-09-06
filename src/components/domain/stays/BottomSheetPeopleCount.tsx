'use client';

import { CircleMinus, CirclePlus } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Txt } from '@/components/atoms';
import { BottomSheet } from '@/components/common';
import { useToast } from '@/components/common/ToastContext';
import { SheetClose } from '@/components/ui/sheet';

type Props = {
  capacity?: number;
};

export default function BottomSheetPeopleCount({ capacity }: Props) {
  const { showToast } = useToast();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const prevSearchParam = searchParams.get('peopleCount');

  const [count, setCount] = useState(+(prevSearchParam ?? 2));

  const handleDecrease = () => setCount((prev) => Math.max(1, prev - 1));
  const handleIncrease = () => {
    // 사랑방 목록에서 오픈된 경우, capacity가 없음
    if (!capacity) {
      setCount((prev) => prev + 1);
      return;
    }

    // 사랑방 상세에서 오픈된 경우 & 선택된 인원이 최대 수용 인원과 같은 경우
    if (capacity === count) {
      showToast(`최대 수용 인원은 ${capacity}명이에요`, 'warning');
      return;
    }

    // 사랑방 상세에서 오픈된 경우 & 선택된 인원이 최대 수용 인원보다 적은 경우
    setCount((prev) => prev + 1);
  };

  const handleDone = () => {
    const params = new URLSearchParams(searchParams);
    params.set('peopleCount', count + '');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <BottomSheet>
      <div className='flex flex-col gap-10 p-4'>
        <Txt size={24} align='center'>
          숙박 인원을 선택하세요
        </Txt>

        <div className='flex justify-between px-20'>
          <button onClick={handleDecrease}>
            <CircleMinus
              size={40}
              color={count === 1 ? 'var(--code-theme9)' : 'var(--code-theme6)'}
            />
          </button>
          <Txt size={30}>{count} 명</Txt>
          <button onClick={handleIncrease}>
            <CirclePlus
              size={40}
              color={count === capacity ? 'var(--code-theme9)' : 'var(--code-theme6)'}
            />
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
