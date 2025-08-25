'use client';

import { Txt } from '@/components/atoms';

type FilterOption = {
  key: string;
  label: string;
  valueSize?: number;
  defaultValue: string;
  onClick: () => void;
};

type Props = {
  stayOption: { location?: string; schedule?: string; peopleCount?: string };
};

export default function StayOptionFilters({ stayOption }: Props) {
  const { location, schedule, peopleCount } = stayOption;

  // 오늘 - 모레 날짜 포맷팅
  const today = new Date().toISOString().split('T')[0].replaceAll('-', '.');
  const twoDaysLater = new Date();
  twoDaysLater.setDate(twoDaysLater.getDate() + 2);
  const twoDaysLaterFormatted = twoDaysLater.toISOString().split('T')[0].replaceAll('-', '.');

  const FILTERS: FilterOption[] = [
    {
      key: 'region',
      label: '지역',
      valueSize: 22,
      defaultValue: location || '전남 해남',
      onClick: () => alert('지역 필터 클릭'),
    },
    {
      key: 'date',
      label: '일정',
      valueSize: 16,
      defaultValue: schedule || `${today}\n-${twoDaysLaterFormatted}`,
      onClick: () => alert('일정 필터 클릭'),
    },
    {
      key: 'people',
      label: '인원',
      valueSize: 22,
      defaultValue: peopleCount || '2명',
      onClick: () => alert('인원 필터 클릭'),
    },
  ];

  return (
    <div className='border-black-626/15 sticky top-[50px] z-50 flex gap-2 border-b bg-white px-4 py-3 shadow-[0_1px_5px_rgba(0,0,0,0.15)]'>
      {FILTERS.map(({ key, label, defaultValue, valueSize = 18, onClick }) => (
        <button
          key={key}
          onClick={onClick}
          className='border-black-626/15 flex w-full flex-col gap-4 rounded-[15px] border bg-white p-2'
        >
          <Txt className='text-gray-070'>{label}</Txt>
          <Txt size={valueSize} className={valueSize === 16 ? 'leading-4' : ''}>
            {defaultValue}
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
