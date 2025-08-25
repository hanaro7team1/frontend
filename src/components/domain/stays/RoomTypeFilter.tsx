import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Txt } from '@/components/atoms';
import { RoomType } from '@/types/stays';

type Props = {
  roomType?: RoomType;
};

const URL = {
  ROOM_TYPE_WITHHOST: '/stays?roomType=하숙형',
  ROOM_TYPE_WITHOUTHOST: '/stays?roomType=독립형',
};

const ROOM_TYPES = [
  { label: '하숙형', href: URL.ROOM_TYPE_WITHHOST },
  { label: '독립형', href: URL.ROOM_TYPE_WITHOUTHOST },
];

export default async function RoomTypeFilter({ roomType }: Props) {
  return (
    <div className='border-black-626/15 flex flex-row border-b bg-white'>
      {ROOM_TYPES.map(({ label, href }) => {
        const isActive = roomType === label || (!roomType && label === '하숙형');

        return (
          <Link
            key={label}
            href={href}
            className='relative mx-4 flex h-[50px] w-full flex-col items-center justify-center'
          >
            <Txt className={cn('text-gray-070', { 'text-green-49d': isActive })}>{label}</Txt>
            {isActive && <div className='bg-green-49d absolute bottom-[4px] h-[3px] w-full' />}
          </Link>
        );
      })}
    </div>
  );
}
