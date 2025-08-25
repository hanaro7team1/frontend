'use client';

import { Txt } from '@/components/atoms';

type FilterOption = {
  key: string;
  label: string;
  value: string;
  valueSize?: number;
  onClick: () => void;
};

const FILTERS: FilterOption[] = [
  {
    key: 'region',
    label: '지역',
    value: '전남 해남',
    valueSize: 22,
    onClick: () => alert('지역 필터 클릭'),
  },
  {
    key: 'date',
    label: '일정',
    value: '25.09.20 -25.09.23',
    valueSize: 16,
    onClick: () => alert('일정 필터 클릭'),
  },
  {
    key: 'people',
    label: '인원',
    value: '2명',
    valueSize: 22,
    onClick: () => alert('인원 필터 클릭'),
  },
];

export default function StayOptionFilters() {
  return (
    <div className='border-black-626/15 sticky top-[50px] z-50 flex gap-2 border-b bg-white px-4 py-3 shadow-[0_1px_5px_rgba(0,0,0,0.15)]'>
      {FILTERS.map(({ key, label, value, valueSize = 18, onClick }) => (
        <button
          key={key}
          onClick={onClick}
          className='border-black-626/15 flex w-full flex-col gap-4 rounded-[15px] border bg-white p-2'
        >
          <Txt className='text-gray-070'>{label}</Txt>
          <Txt size={valueSize} className={valueSize === 16 ? 'leading-4' : ''}>
            {value}
          </Txt>
          <div className='bg-black-626/45 mt-1 rounded-full p-0.5'>
            <Txt size={18} className='text-white'>
              변경하기
            </Txt>
          </div>
        </button>
      ))}
    </div>
  );
}
