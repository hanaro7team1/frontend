'use client';

import { useSearchParams } from 'next/navigation';
import { Txt } from '@/components/atoms';
import { formatDate, getDefaultDates } from '@/utils/stays/stays';
import { OptionFilter } from '@/types/stays';
import { BottomSheetLocation, BottomSheetPeopleCount, BottomSheetSchedule } from '.';

export default function FilterStayOptions() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  const schedule = searchParams.get('schedule');
  const peopleCount = searchParams.get('peopleCount');

  const [today, twoDaysLater] = getDefaultDates();

  const FILTERS: OptionFilter[] = [
    {
      key: 'region',
      label: '지역',
      valueSize: 22,
      defaultValue: location?.split(' ')[1] || '전체',
      BottomSheetType: <BottomSheetLocation />,
    },
    {
      key: 'date',
      label: '일정',
      valueSize: 18,
      defaultValue: schedule || `${formatDate(today)}\n-${formatDate(twoDaysLater)}`,
      BottomSheetType: <BottomSheetSchedule />,
    },
    {
      key: 'people',
      label: '인원',
      valueSize: 22,
      defaultValue: peopleCount || '2',
      BottomSheetType: <BottomSheetPeopleCount />,
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
          <Txt align='center' size={valueSize} className={valueSize === 16 ? 'leading-4' : ''}>
            {defaultValue + (label === '인원' ? '명' : '')}
          </Txt>
          {BottomSheetType}
        </div>
      ))}
    </div>
  );
}
