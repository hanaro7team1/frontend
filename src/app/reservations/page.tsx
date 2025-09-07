import { serverPrivateApi } from '@/lib/axios-server';
import { EmptyState, Header } from '@/components/common';
import FilterReserv from '@/components/domain/reservations/FilterReserv';
import ReservationCard from '@/components/domain/reservations/ReservationCard';
import { getIsAdmin } from '@/utils/auth/auth-server';
import { STATUS_MAP } from '@/constants/reservations/reservation';
import { ReservationsResponse, ReservationsSearchParams } from '@/types/reservation';

type Props = {
  searchParams: Promise<ReservationsSearchParams>;
};

export default async function ReservationsPage({ searchParams }: Props) {
  const searchParam = await searchParams;
  const isAdmin = await getIsAdmin();

  const api = await serverPrivateApi();
  const { data } = await api.get<ReservationsResponse>(
    isAdmin ? '/api/admin/reservations' : '/api/reservations',
    {
      params: { filter: STATUS_MAP[searchParam.reservationStatus] ?? STATUS_MAP['전체'] },
    },
  );

  return (
    <>
      <Header title={isAdmin ? '우리 마을 사랑방 예약 목록' : '나의 예약 목록'} withoutBorder />
      <FilterReserv searchParams={searchParam} isAdmin={isAdmin} />
      <div className='flex flex-col gap-3 p-3'>
        {!data.dtoList.length ? (
          <EmptyState>
            조건에 맞는 예약내역이 없어요
            <br /> 다른 조건으로 찾아 보세요
          </EmptyState>
        ) : (
          data.dtoList.map((reservation) => (
            <ReservationCard key={reservation.reservationId} data={reservation} />
          ))
        )}
      </div>
    </>
  );
}
