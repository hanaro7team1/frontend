import { Header } from '@/components/common';
import FilterReserv from '@/components/domain/reservations/FilterReserv';
import ReservationCard from '@/components/domain/reservations/ReservationCard';
import { getIsAdmin } from '@/utils/auth/auth-server';
import { ReservationsResponse } from '@/types/reservation';
import { serverPrivateApi } from '@/lib/axios-server';

export type ReservationStatus = '예약됨' | '방문 완료' | '취소됨';
export type ReservationsSearchParams = {
  reservationStatus?: ReservationStatus | '전체';
};

type Props = {
  searchParams: Promise<ReservationsSearchParams>;
};

export default async function ReservationsPage({ searchParams }: Props) {
  const searchParam = await searchParams;
  const isAdmin = await getIsAdmin();

  const api = await serverPrivateApi();
  const { data } = await api.get<ReservationsResponse>(isAdmin ? '/api/admin/reservations' : '/api/reservations', {
    params: searchParam,
  });

  return (
    <>
      <Header title={isAdmin ? '우리 마을 사랑방 예약 목록' : '나의 예약 목록'} withoutBorder />
      <FilterReserv searchParams={searchParam} isAdmin={isAdmin} />
      <div className='flex flex-col gap-3 p-3'>
        {data.dtoList.map((reservation) => (
          <ReservationCard key={reservation.reservationId} data={reservation} />
        ))}
      </div>
    </>
  );
}
