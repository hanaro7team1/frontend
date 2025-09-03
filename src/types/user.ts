import { ReservationViewStatus } from '@/enums/reservation';

export type UserReservationResponse = {
  userName: string;
  //   reservationId: number;

  title: string;
  viewStatus: ReservationViewStatus;
  dDay: number;
  startDate: string;
  endDate: string;
};
