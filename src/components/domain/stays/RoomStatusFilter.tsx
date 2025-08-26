import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Txt } from '@/components/atoms';
import { HEADER_HEIGHT } from '@/constants/common/BottomTabNav';
import { RoomStatus } from '@/types/stays';

const URL = {
  ROOM_ALL: '/admin/stays?roomStatus=전체',
  ROOM_STATUS_AVAILABLE: '/admin/stays?roomStatus=예약 가능',
  ROOM_STATUS_FULL: '/admin/stays?roomStatus=예약 마감',
  ROOM_STATUS_CLOSED: '/admin/stays?roomStatus=예약 닫힘',
};

const ROOM_STATUSES = [
  { label: '전체', href: URL.ROOM_ALL },
  { label: '예약 가능', href: URL.ROOM_STATUS_AVAILABLE },
  { label: '예약 마감', href: URL.ROOM_STATUS_FULL },
  { label: '예약 닫힘', href: URL.ROOM_STATUS_CLOSED },
];

type Props = {
  roomStatus: RoomStatus;
};

export default async function RoomStatusFilter({ roomStatus }: Props) {
  return (
    <div
      className={`border-black-626/15 sticky top-[${HEADER_HEIGHT}px] flex flex-row border-b bg-white`}
    >
      {ROOM_STATUSES.map(({ label, href }) => {
        const isActive = roomStatus === label || (!roomStatus && label === '전체');

        return (
          <Link
            key={label}
            href={href}
            replace
            className='relative mx-1 flex h-[50px] w-full flex-col items-center justify-center'
          >
            <Txt
              className={cn('text-gray-070', {
                'text-pink-a76': isActive,
              })}
            >
              {label}
            </Txt>
            {isActive && (
              <div
                className={cn('absolute bottom-[4px] h-[3px] w-full', {
                  'bg-pink-a76': isActive,
                })}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
