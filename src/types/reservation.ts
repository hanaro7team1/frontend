import { ReservationStatus } from '@/enums/reservation';
import { Paged } from './common';

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

export type ReservationsListResponse = {
    id: number;
    title: string;
    resrvStatus: 'RESERVED' | 'CANCELLED';
    visitStatus: 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED';
    dDay: number;
    startDate: string;
    endDate: string;
    // ReservationListItemDTO에는 이미지 없음. 피그마 디자인에 맞춰 임의추가
    imgUrl: string;
};
export type ReservationsResponse = Paged<ReservationsListResponse>;

