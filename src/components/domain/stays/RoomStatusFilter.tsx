import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Txt } from '@/components/atoms';
import { ROOM_STATUSES } from '@/constants/stays/stays';
import { RoomStatus } from '@/types/stays';

type Props = {
  roomStatus: RoomStatus;
};

export default async function RoomStatusFilter({ roomStatus }: Props) {
  return (
    <div className={`border-black-626/15 sticky top-[50px] flex flex-row border-b bg-white`}>
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
