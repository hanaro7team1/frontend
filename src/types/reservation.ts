import { ReservationStatus } from '@/enums/reservation';

export type ReservationPayload = {
  id: number;
  confirmedDate: string;
  hostName: string;
  roomName: string;
  status: ReservationStatus;
};

export type ReservationDetail = {
  address: string;
  endDate: string;
  isFarm: boolean;
  isHomestay: boolean;
  memberName: string;
  memberPhone: string;
  ownerName: string;
  ownerPhone: string;
  personCnt: number;
  reservationId: number;
  resrvStatus: string;
  startDate: string;
  stayId: number;
  title: string;
};
