'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button, ShadowBox, Txt } from '@/components/atoms';
import { StatusCapsule } from '../../stays';

type Props = {
  id: string; // 예약 번호
  name: string; // 사랑방 이름
  dateRange: string; // 예정 방문일
  imgUrl: string; // 숙소 이미지
};

export default function RecentStayCard({ id, name, dateRange, imgUrl }: Props) {
  const router = useRouter();
  return (
    <ShadowBox className='bg-white p-4'>
      <div className='mb-3 flex items-center gap-2'>
        {/* TODO: 실제 예약 상태 연동 */}
        <StatusCapsule status={'방문 중'} />
        <Txt size={22} weight='bold' align='left'>
          지금 머무르고 있어요
        </Txt>
      </div>

      <div className='border-black-626/15 mb-4 border-b' />

      <Image
        src={imgUrl}
        alt={name}
        width={0}
        height={0}
        sizes='100vw'
        className='mb-3 h-[113px] w-full rounded-[8px] object-cover'
      />

      <div className='mb-4 flex flex-col'>
        <Txt size={22} align='left'>
          {name}
        </Txt>
        <Txt size={18} align='left'>
          {dateRange}
        </Txt>
      </div>

      <Button
        title='예약 자세히 보기'
        color='gray'
        onClick={() => router.push(`/reservation/${id}`)}
        className='w-full'
      />
    </ShadowBox>
  );
}
