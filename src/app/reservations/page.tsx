import { serverPrivateApi } from '@/lib/axios-server';
import { EmptyState, Header } from '@/components/common';
import FilterReserv from '@/components/domain/reservations/FilterReserv';
import ReservationCard from '@/components/domain/reservations/ReservationCard';
import { getIsAdmin } from '@/utils/auth/auth-server';
import {
  ReservationsListResponse,
  ReservationsResponse,
  ReservationsSearchParams,
} from '@/types/reservation';

type Props = {
  searchParams: Promise<ReservationsSearchParams>;
};

const STATUS_TO_FILTER: Record<
  ReservationsListResponse['viewStatus'],
  '예약됨' | '방문 완료' | '취소됨'
> = {
  '방문 중': '예약됨',
  '방문 전': '예약됨',
  '방문 완료': '방문 완료',
  '예약 취소': '취소됨',
} as const;

export default async function ReservationsPage({ searchParams }: Props) {
  const searchParam = await searchParams;
  const isAdmin = await getIsAdmin();

  const api = await serverPrivateApi();
  const { data } = await api.get<ReservationsResponse>(
    isAdmin ? '/api/admin/reservations' : '/api/reservations',
    {
      params: searchParam,
    },
  );

  const filtered =
    !searchParam.reservationStatus || searchParam.reservationStatus === '전체'
      ? data.dtoList
      : data.dtoList.filter(
          (item) => STATUS_TO_FILTER[item.viewStatus] === searchParam.reservationStatus,
        );

  return (
    <>
      <Header title={isAdmin ? '우리 마을 사랑방 예약 목록' : '나의 예약 목록'} withoutBorder />
      <FilterReserv searchParams={searchParam} isAdmin={isAdmin} />
      <div className='flex flex-col gap-3 p-3'>
        {!filtered.length ? (
          <EmptyState>
            조건에 맞는 예약내역이 없어요
            <br /> 다른 조건으로 찾아 보세요
          </EmptyState>
        ) : (
          filtered.map((reservation) => (
            <ReservationCard key={reservation.reservationId} data={reservation} />
          ))
        )}
      </div>
    </>
  );
}
