'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, ShadowBox, Txt } from '@/components/atoms';
import { AdminStayListItemResponse } from '@/types/stays';
import { AdminCalendarModal, StatusCapsule } from '.';

type Props = {
  data: AdminStayListItemResponse;
};

export default function AdminRoomItem({ data }: Props) {
  const { id, imageURL, hostName, title, stayResrvStatus } = data;

  const router = useRouter();
  const goToDetailPage = () => router.push(`/stays/${id}`);

  const [isCalendarModalOpened, setIsCalendarModalOpened] = useState(false);
  const openModal = () => setIsCalendarModalOpened(true);
  const closeModal = () => setIsCalendarModalOpened(false);

  return (
    <ShadowBox>
      <div className='relative h-[140px] overflow-hidden'>
        <Image src={imageURL} alt={title} fill className='object-cover' />
      </div>
      <div className='space-y-4 p-3'>
        <div className='flex flex-col gap-2'>
          <Txt className='text-gray-070'>{hostName + ' 어르신 댁'}</Txt>

          <div className='flex justify-between'>
            <Txt size={22}>{title}</Txt>
            <StatusCapsule status={stayResrvStatus} />
          </div>
        </div>
        <div className='flex gap-2'>
          <Button title='정보 수정' color='gray' onClick={goToDetailPage} />
          <Button title='예약 가능 날짜 변경' titleSize={18} color='pink' onClick={openModal} />
        </div>
      </div>
      {isCalendarModalOpened && <AdminCalendarModal stayId={id} closeModal={closeModal} />}
    </ShadowBox>
  );
}
