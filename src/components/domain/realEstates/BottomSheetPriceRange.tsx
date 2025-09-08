'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Txt } from '@/components/atoms';
import { BottomSheet } from '@/components/common';
import { DoubleSlider } from '@/components/ui/doubleSlider';
import { SheetClose } from '@/components/ui/sheet';
import { formatPriceRange } from '@/utils/realEstates/formatPriceRange';

export default function BottomSheetPriceRange() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const prevSearchParam = searchParams.get('priceRange');

  const [newPriceRange, setNewPriceRange] = useState<number[]>(
    prevSearchParam ? prevSearchParam.split('-').map(Number) : [0, 200000000],
  );

  const handleDone = () => {
    const params = new URLSearchParams(searchParams);

    params.set('priceRange', `${newPriceRange[0]}-${newPriceRange[1]}`);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <BottomSheet>
      <div className='flex flex-col items-center p-4'>
        <Txt size={24}>가격 범위를 선택하세요</Txt>

        <div className='relative mt-25 mb-10 h-[50px] w-full px-4'>
          <DoubleSlider
            value={newPriceRange}
            defaultValue={newPriceRange}
            onValueChange={setNewPriceRange}
            max={200000000}
            min={0}
            step={1000000}
            className='z-10'
          />
        </div>

        <SheetClose
          onClick={handleDone}
          className='bg-green-49d flex h-[50px] w-full items-center justify-center rounded-[10px] py-[11px]'
        >
          <Txt className='text-white'>
            {formatPriceRange(newPriceRange[0], newPriceRange[1])} 적용하기
          </Txt>
        </SheetClose>
      </div>
    </BottomSheet>
  );
}
