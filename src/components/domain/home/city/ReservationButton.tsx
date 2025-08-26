'use client';

import { List } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Txt } from '@/components/atoms';

export default function ReservationButton() {
  const router = useRouter();

  return (
    <button
      className={
        'bg-green-49d flex w-full items-center gap-2 rounded-[10px] py-[21px] pl-5'
      }
      onClick={() => router.push('/reservations')}
    >
      <List className='items-center text-white' />
      <Txt className='text-white' size={22} weight='bold'>
        나의 예약 목록 보기
      </Txt>
    </button>
  );
}
