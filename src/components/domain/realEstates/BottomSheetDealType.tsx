'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Txt } from '@/components/atoms';
import { BottomSheet } from '@/components/common';
import { SheetClose } from '@/components/ui/sheet';

export default function BottomSheetDealType() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const prevSearchParam = searchParams.get('tradeType');

  const handleSelectDealType = (newDealType: '전세' | '매매') => {
    const params = new URLSearchParams(searchParams);
    params.set('tradeType', newDealType);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSelectEntire = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('tradeType');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <BottomSheet>
      <div className='flex flex-col items-center gap-4 p-4'>
        <Txt size={24}>거래 형태를 선택하세요</Txt>

        <div className='flex w-full items-center justify-around'>
          <SheetClose className='flex shrink-0 items-center gap-3 p-4' onClick={handleSelectEntire}>
            <div
              className={cn(
                'border-black-626/15 flex h-7 w-7 items-center justify-center rounded-full border-2',
                { 'border-green-49d': !prevSearchParam },
              )}
            >
              <div
                className={cn('bg-black-626/15 h-4 w-4 rounded-full', {
                  'bg-green-49d': !prevSearchParam,
                })}
              />
            </div>
            <Txt>전체</Txt>
          </SheetClose>

          <SheetClose
            className='flex shrink-0 items-center gap-3 p-4'
            onClick={() => handleSelectDealType('매매')}
          >
            <div
              className={cn(
                'border-black-626/15 flex h-7 w-7 items-center justify-center rounded-full border-2',
                { 'border-green-49d': prevSearchParam === '매매' },
              )}
            >
              <div
                className={cn('bg-black-626/15 h-4 w-4 rounded-full', {
                  'bg-green-49d': prevSearchParam === '매매',
                })}
              />
            </div>
            <Txt>매매</Txt>
          </SheetClose>

          <SheetClose
            className='flex shrink-0 items-center gap-3 p-4'
            onClick={() => handleSelectDealType('전세')}
          >
            <div
              className={cn(
                'border-black-626/15 flex h-7 w-7 items-center justify-center rounded-full border-2',
                { 'border-green-49d': prevSearchParam === '전세' },
              )}
            >
              <div
                className={cn('bg-black-626/15 h-4 w-4 rounded-full', {
                  'bg-green-49d': prevSearchParam === '전세',
                })}
              />
            </div>
            <Txt>전세</Txt>
          </SheetClose>
        </div>
      </div>
    </BottomSheet>
  );
}
