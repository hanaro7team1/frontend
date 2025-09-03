import { ReservationStatus } from '@/enums/reservation';

export type ReservationPayload = {
  id: number;
  confirmedDate: string;
  hostName: string;
  roomName: string;
  status: ReservationStatus;
};
