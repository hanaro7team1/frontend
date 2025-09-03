import { ReservationStatus } from '@/enums/reservation';

export type ReservationInfo = {
  id: number;
  name: string;
  location: string;
  status: '방문 중' | '방문 전' | '방문 완료' | '예약 취소';
  imgUrl: string;
};

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
  imageUrl: string;
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
