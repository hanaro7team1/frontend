'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Txt } from '@/components/atoms';
import { BottomSheet } from '@/components/common';
import { SheetClose } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';

export default function BottomSheetPriceRange() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const prevSearchParam = searchParams.get('priceRange');

  const [newPriceRange, setNewPriceRange] = useState(
    prevSearchParam ? prevSearchParam.split('-').map(Number) : [4000, 6000],
  );

  const handleDone = () => {
    const params = new URLSearchParams(searchParams);
    params.set(
      'priceRange',
      (newPriceRange[0] === 0 ? '' : newPriceRange[0] + '만원') +
        '\n-\n' +
        (newPriceRange[1] === 10000 ? '1억' : newPriceRange[1] + '만원'),
    );
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <BottomSheet>
      <div className='flex flex-col items-center p-4'>
        <Txt size={24}>가격 범위를 선택하세요</Txt>

        <div className='relative mt-25 mb-10 h-[50px] w-full px-4'>
          <Slider
            value={newPriceRange}
            defaultValue={newPriceRange}
            onValueChange={setNewPriceRange}
            max={10000}
            min={0}
            step={1000}
            className='z-10'
          />
        </div>

        <SheetClose
          onClick={handleDone}
          className='bg-green-49d flex h-[50px] w-full items-center justify-center rounded-[10px] py-[11px]'
        >
          <Txt className='text-white'>완료</Txt>
        </SheetClose>
      </div>
    </BottomSheet>
  );
}
