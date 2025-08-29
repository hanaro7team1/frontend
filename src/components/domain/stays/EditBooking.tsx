'use client';

import { CalendarCheck, Users } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ShadowBox, Txt } from '@/components/atoms';
import { FixedBottomButton } from '@/components/common';
import { BottomSheetPeopleCount, BottomSheetSchedule } from '.';
import { InfoRow } from '../reservations';

type Props = {
  data: {
    schedule: string;
    peopleCount: string;
  };
};

export default function EditBooking({ data }: Props) {
  const { schedule, peopleCount } = data;

  const [wantsFarmExperience, setWantsFarmExperience] = useState(true);

  return (
    <>
      <div className='flex flex-col gap-4'>
        <Txt size={22}>예약 정보 수정</Txt>
        <div className='flex flex-col gap-3'>
          <ShadowBox className='gap-3.5 px-3.5 py-3'>
            <InfoRow icon={CalendarCheck} label='일정' value={schedule} />
            <BottomSheetSchedule />
          </ShadowBox>
          <ShadowBox className='gap-3.5 px-3.5 py-3'>
            <InfoRow icon={Users} label='인원' value={peopleCount} />
            <BottomSheetPeopleCount />
          </ShadowBox>
        </div>
      </div>

      <div className='flex flex-col'>
        <Txt size={22}>농장 체험 희망 여부</Txt>
        <div className='flex items-center gap-20'>
          <button
            className='flex items-center gap-3 p-4'
            onClick={() => setWantsFarmExperience(true)}
          >
            <div
              className={cn(
                'border-black-626/15 flex h-7 w-7 items-center justify-center rounded-full border-2',
                { 'border-green-49d': wantsFarmExperience },
              )}
            >
              <div
                className={cn('bg-black-626/15 h-4 w-4 rounded-full', {
                  'bg-green-49d': wantsFarmExperience,
                })}
              />
            </div>
            <Txt>예</Txt>
          </button>
          <button
            className='flex items-center gap-3 p-4'
            onClick={() => setWantsFarmExperience(false)}
          >
            <div
              className={cn(
                'border-black-626/15 flex h-7 w-7 items-center justify-center rounded-full border-2',
                { 'border-green-49d': !wantsFarmExperience },
              )}
            >
              <div
                className={cn('bg-black-626/15 h-4 w-4 rounded-full', {
                  'bg-green-49d': !wantsFarmExperience,
                })}
              />
            </div>
            <Txt>아니요</Txt>
          </button>
        </div>
      </div>

      <FixedBottomButton rightBtnText='예약 확정하기' onClickRightBtn={() => alert('예약확정')} />
    </>
  );
}
