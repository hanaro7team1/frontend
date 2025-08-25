import { cn } from '@/lib/utils';
import { Txt } from '@/components/atoms';
import { ReservationInfo, RoomInfo } from '../../../../public/dummy';

const STATUS_STYLES: Record<RoomInfo['status'] | ReservationInfo['status'], string> = {
  '예약 가능': ' bg-blue-400',
  '예약 마감': 'bg-red-500/90',
  '예약 닫힘': 'bg-black-626/70',
  '방문 중': 'bg-orange-85a',
  '방문 전': 'bg-green-49d',
  '방문 완료': 'bg-black-444',
  '예약 취소': 'bg-black-626/40',
};

export default function StatusCapsule({
  status,
}: {
  status: RoomInfo['status'] | ReservationInfo['status'];
}) {
  return (
    <div className={cn('flex w-[100px] justify-center rounded-full py-0.5', STATUS_STYLES[status])}>
      <Txt className='text-white'>{status}</Txt>
    </div>
  );
}
