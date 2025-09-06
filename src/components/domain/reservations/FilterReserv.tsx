import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Txt } from '@/components/atoms';
import { RESERV_STATUSES } from '@/constants/reservations/reservation';
import { ReservationsSearchParams } from '@/types/reservation';

type Props = {
  searchParams: ReservationsSearchParams;
  isAdmin: boolean;
};

export default function FilterReserv({ searchParams, isAdmin }: Props) {
  const { reservationStatus } = searchParams;

  return (
    <>
      <div className='border-black-626/15 flex flex-row border-b bg-white'>
        {RESERV_STATUSES.map(({ label, href }) => {
          const isActive = reservationStatus === label || (!reservationStatus && label === '전체');
          return (
            <Link
              key={label}
              href={href}
              replace
              className='relative mx-1 flex h-[50px] w-full flex-col items-center justify-center'
            >
              <Txt
                className={cn('text-gray-070', {
                  'text-green-49d': isActive,
                  'text-pink-a76': isAdmin && isActive,
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
    </>
  );
}
