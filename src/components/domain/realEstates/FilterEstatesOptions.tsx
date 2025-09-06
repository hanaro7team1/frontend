'use client';

import { useSearchParams } from 'next/navigation';
import { Txt } from '@/components/atoms';
import { OptionFilter } from '@/types/stays';
import { BottomSheetDealType, BottomSheetPriceRange } from '.';
import { BottomSheetLocation } from '../stays';

export default function FilterEstatesOptions() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  const tradeType = searchParams.get('tradeType');
  const priceRange = searchParams.get('priceRange');

  const FILTERS: OptionFilter[] = [
    {
      key: 'region',
      label: '지역',
      valueSize: 22,
      defaultValue: location?.split(' ')[1] || '전체',
      BottomSheetType: <BottomSheetLocation />,
    },
    {
      key: 'tradeType',
      label: '거래형태',
      valueSize: 22,
      defaultValue: tradeType || '전체',
      BottomSheetType: <BottomSheetDealType />,
    },
    {
      key: 'priceRange',
      label: '가격',
      valueSize: 16,
      defaultValue: priceRange?.replace('10000만원', '1억') || '4000만원\n~ 6000만원',
      BottomSheetType: <BottomSheetPriceRange />,
    },
  ];

  return (
    <div className='border-black-626/15 sticky top-[50px] z-50 flex gap-2 border-b bg-white px-4 py-3 shadow-[0_1px_5px_rgba(0,0,0,0.15)]'>
      {FILTERS.map(({ key, label, defaultValue, valueSize = 18, BottomSheetType }) => (
        <div
          key={key}
          className='border-black-626/15 flex w-full flex-col justify-between gap-3 rounded-[15px] border bg-white p-2'
        >
          <Txt align='center' className='text-gray-070'>
            {label}
          </Txt>
          <Txt align='center' size={valueSize} className={valueSize === 16 ? 'leading-5' : ''}>
            {defaultValue}
          </Txt>
          {BottomSheetType}
        </div>
      ))}
    </div>
  );
}
