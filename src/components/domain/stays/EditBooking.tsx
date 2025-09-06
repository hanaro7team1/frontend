'use client';

import { CalendarCheck, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { privateApi } from '@/lib/axios-client';
import { cn } from '@/lib/utils';
import { ShadowBox, Txt } from '@/components/atoms';
import { FixedBottomButton } from '@/components/common';
import { BottomSheetPeopleCount, BottomSheetScheduleDetail } from '.';
import { InfoRow } from '../reservations';

type Props = {
  data: {
    stayId: number;
    schedule: string;
    peopleCount: string;
    capacity: number;
  };
};

export default function EditBooking({ data }: Props) {
  const { schedule, peopleCount, capacity } = data;

  const [wantsFarmExperience, setWantsFarmExperience] = useState(true);

  const searchParams = useSearchParams();
  const searchParamsObj = Object.fromEntries(searchParams.entries());
  const reservationId = searchParams.get('reservationId');

  const router = useRouter();

  const handleBooking = async () => {
    try {
      const req = {
        startDate: '20' + searchParamsObj.schedule.split('-')[0].replaceAll('.', '-'),
        endDate: '20' + searchParamsObj.schedule.split('-')[1].replaceAll('.', '-'),
        personCnt: searchParamsObj.peopleCount ?? 2,
        isFarm: wantsFarmExperience,
      };

      const { status } = await privateApi.patch(`/api/reservations/${reservationId}/confirm`, req);

      if (status === 200) {
        alert('예약이 완료되었습니다!');
        router.push('/reservations');
      } else {
        alert('예약에 실패했습니다. 다른 사용자가 먼저 예약했을 수 있습니다. 다시 시도해주세요.');
      }
    } catch {
      alert('예약 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div className='flex flex-col gap-4'>
        <Txt size={22}>예약 정보 수정</Txt>
        <div className='flex flex-col gap-3'>
          <ShadowBox className='gap-3.5 px-3.5 py-3'>
            <InfoRow icon={CalendarCheck} label='일정' value={schedule} />
            <BottomSheetScheduleDetail />
          </ShadowBox>
          <ShadowBox className='gap-3.5 px-3.5 py-3'>
            <InfoRow icon={Users} label='인원' value={peopleCount} />
            <BottomSheetPeopleCount capacity={capacity} />
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

      <FixedBottomButton rightBtnText='예약 확정하기' onClickRightBtn={handleBooking} />
    </>
  );
}
