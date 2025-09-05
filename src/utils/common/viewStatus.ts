import { ReservationViewStatus } from '@/enums/reservation';

export const getReservationMessage = (status: ReservationViewStatus, dDay?: number): string => {
  switch (status) {
    case ReservationViewStatus.UPCOMING:
      return `${dDay}일 후 방문해요`;
    case ReservationViewStatus.IN_PROGRESS:
      return '지금 머무르고 있어요';
    case ReservationViewStatus.COMPLETED:
      return '방문을 마쳤어요';
    case ReservationViewStatus.CANCELLED:
      return '예약을 취소했어요';
    default:
      return '';
  }
};
