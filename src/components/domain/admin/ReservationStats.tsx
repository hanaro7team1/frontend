'use client';

import { Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button, ShadowBox, Txt } from '@/components/atoms';

type Props = {
  upcomingCnt: number; // 예약 완료된 예약 수
  inProgressCnt: number; // 방문 중인 예약 수
  completedCnt: number; // 방문 완료한 예약 수
};

export default function ReservationStats({ upcomingCnt, inProgressCnt, completedCnt }: Props) {
  const router = useRouter();

  return (
    <ShadowBox className='space-y-5 bg-white p-5'>
      <div className='flex items-center gap-2'>
        <Calendar size={24} />
        <Txt>예약 현황</Txt>
      </div>

      {/* 예약 통계 */}
      <div className='flex items-center justify-between text-center'>
        <div className='flex flex-1 flex-col'>
          <Txt size={32} weight='bold' align='center'>
            {upcomingCnt}
          </Txt>
          <Txt size={16} align='center'>
            방문 전
          </Txt>
        </div>
        <div className='flex flex-1 flex-col'>
          <Txt size={32} weight='bold' align='center'>
            {inProgressCnt}
          </Txt>
          <Txt size={16} align='center'>
            방문 중
          </Txt>
        </div>
        <div className='flex flex-1 flex-col'>
          <Txt size={32} weight='bold' align='center'>
            {completedCnt}
          </Txt>
          <Txt size={16} align='center'>
            방문 완료
          </Txt>
        </div>
      </div>

      <Button
        title='예약 관리하기'
        color='gray'
        onClick={() => router.push('/admin/reservations')}
        className='w-full'
      />
    </ShadowBox>
  );
}
