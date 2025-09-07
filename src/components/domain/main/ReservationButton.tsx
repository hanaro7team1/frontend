import { List } from 'lucide-react';
import Link from 'next/link';
import { Txt } from '@/components/atoms';

export default function ReservationButton() {
  return (
    <Link
      href='/reservations'
      className='bg-green-49d flex w-full items-center gap-3 rounded-[10px] py-[21px] pl-5'
    >
      <List className='text-white' size={32} />
      <Txt className='text-white' size={22} weight='bold'>
        나의 예약 목록 보기
      </Txt>
    </Link>
  );
}
