'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button, ShadowBox, Txt } from '@/components/atoms';
import { getReservationMessage } from '@/utils/common/viewStatus';
import { formatDate } from '@/utils/main/formatDate';
import { ReservationViewStatus } from '@/enums/reservation';
import { StatusCapsule } from '../stays';

type Props = {
  reservationId: number; // 예약 번호
  title: string; // 사랑방 이름
  startDate: string; // 예정 방문 시작일
  endDate: string; // 예정 방문 종료일
  imgUrl: string; // 숙소 이미지
  viewStatus: ReservationViewStatus; // 방문 상태
  dDay?: number; // 남은 방문일
};

export default function RecentStayCard({
  reservationId,
  title,
  startDate,
  endDate,
  viewStatus,
  imgUrl,
  dDay,
}: Props) {
  const router = useRouter();
  const dateRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;
  const statusMsg = getReservationMessage(viewStatus, dDay);
  return (
    <ShadowBox className='bg-white p-4'>
      <div className='mb-3 flex items-center gap-2'>
        <StatusCapsule status={viewStatus} />
        <Txt size={22} weight='bold'>
          {statusMsg}
        </Txt>
      </div>

      <div className='border-black-626/15 mb-4 border-b' />

      <Image
        src={imgUrl}
        alt={title || '사랑방 이미지'}
        width={0}
        height={0}
        sizes='100vw'
        className='mb-3 h-[113px] w-full rounded-[8px] object-cover'
      />

      <div className='mb-4 flex flex-col'>
        <Txt size={22}>{title}</Txt>
        <Txt size={18}>{dateRange}</Txt>
      </div>

      <Button
        title='예약 자세히 보기'
        color='gray'
        onClick={() => router.push(`/reservations/${reservationId}`)}
        className='w-full'
      />
    </ShadowBox>
  );
}
