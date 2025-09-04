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

  const handleDone = (newDealType: '전세' | '매매') => {
    const params = new URLSearchParams(searchParams);
    params.set('tradeType', newDealType);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <BottomSheet>
      <div className='flex flex-col gap-4 p-4'>
        <Txt size={24} align='center'>
          거래 형태를 선택하세요
        </Txt>

        <div className='flex items-center gap-20'>
          <SheetClose className='flex items-center gap-3 p-4' onClick={() => handleDone('전세')}>
            <div
              className={cn(
                'border-green-49d flex h-7 w-7 items-center justify-center rounded-full border-2',
                { 'border-black-626/15': prevSearchParam === '매매' },
              )}
            >
              <div
                className={cn('bg-green-49d h-4 w-4 rounded-full', {
                  'bg-black-626/15': prevSearchParam === '매매',
                })}
              />
            </div>
            <Txt>전세</Txt>
          </SheetClose>
          <SheetClose className='flex items-center gap-3 p-4' onClick={() => handleDone('매매')}>
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
        </div>
      </div>
    </BottomSheet>
  );
}
