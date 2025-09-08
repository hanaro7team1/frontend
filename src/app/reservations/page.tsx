import { serverPrivateApi } from '@/lib/axios-server';
import { EmptyState, Header } from '@/components/common';
import { FilterReserv, ReservationCard } from '@/components/domain/reservations';
import { STATUS_MAP } from '@/constants/reservations/reservation';
import { ReservationsResponse, ReservationsSearchParams } from '@/types/reservation';

type Props = {
  searchParams: Promise<ReservationsSearchParams>;
};

export default async function ReservationsPage({ searchParams }: Props) {
  const searchParam = await searchParams;

  const api = await serverPrivateApi();
  const { data } = await api.get<ReservationsResponse>('/api/reservations', {
    params: { filter: STATUS_MAP[searchParam.status ?? '전체'] },
  });

  return (
    <>
      <Header title='나의 예약 목록' withoutBorder />
      <FilterReserv searchParams={searchParam} />
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
