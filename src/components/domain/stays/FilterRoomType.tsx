import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Txt } from '@/components/atoms';
import { ROOM_TYPES, STAYS_URL } from '@/constants/stays/stays';
import { StaysSearchParams } from '@/types/stays';

type Props = {
  searchParams: StaysSearchParams;
  isAdmin: boolean;
};

export default async function FilterRoomType({ searchParams, isAdmin }: Props) {
  const { roomType } = searchParams;
  const cleanSearchParams = Object.fromEntries(
    Object.entries(searchParams).filter(([, value]) => typeof value === 'string'),
  );

  return (
    <div className='border-black-626/15 flex flex-row border-b bg-white'>
      {ROOM_TYPES.map((label) => {
        const params = new URLSearchParams(cleanSearchParams);
        params.set('roomType', label);
        const isActive = label === roomType || (!roomType && label === '하숙형');

        return (
          <Link
            key={label}
            href={`${STAYS_URL}?${params}`}
            replace
            className='relative mx-4 flex h-[50px] w-full flex-col items-center justify-center'
          >
            <Txt
              className={cn('text-gray-070', {
                'text-green-49d': isActive,
                'text-pink-a76': isActive && isAdmin,
              })}
            >
              {label}
            </Txt>
            {isActive && (
              <div
                className={cn('absolute bottom-[4px] h-[3px] w-full', {
                  'bg-green-49d': isActive,
                  'bg-pink-a76': isActive && isAdmin,
                })}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
