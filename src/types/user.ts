import { ReservationViewStatus } from '@/enums/reservation';

export type UserReservationResponse = {
  memberName: string;
  reservationId: number;

  title: string;
  imgUrl: string;
  viewStatus: ReservationViewStatus;
  dDay: number;
  startDate: string;
  endDate: string;
};
