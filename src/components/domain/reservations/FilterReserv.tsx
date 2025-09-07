import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Txt } from '@/components/atoms';
import {
  ADMIN_RESERV_URL,
  RESERV_STATUSES,
  RESERV_URL,
} from '@/constants/reservations/reservation';
import { ReservationsSearchParams } from '@/types/reservation';

type Props = {
  searchParams: ReservationsSearchParams;
  isAdmin?: boolean;
};

export default function FilterReserv({ searchParams, isAdmin = false }: Props) {
  const { status: statusParam } = searchParams;

  return (
    <div className='border-black-626/15 sticky top-[50px] z-50 flex flex-row border-b bg-white'>
      {RESERV_STATUSES.map((statusFilter) => {
        const isActive = statusParam === statusFilter || (!statusParam && statusFilter === '전체');
        return (
          <Link
            key={statusFilter}
            href={{
              pathname: isAdmin ? ADMIN_RESERV_URL : RESERV_URL,
              query: {
                ...searchParams,
                status: statusFilter,
              },
            }}
            replace
            className='relative mx-1 flex h-[50px] w-full flex-col items-center justify-center'
          >
            <Txt
              className={cn('text-gray-070', {
                'text-green-49d': isActive,
                'text-pink-a76': isAdmin && isActive,
              })}
            >
              {statusFilter}
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
