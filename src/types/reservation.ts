import { ReservationStatus } from '@/enums/reservation';
import { Paged } from './common';

export type ReservationInfo = {
  id: number;
  name: string;
  location: string;
  status: '방문 중' | '방문 전' | '방문 완료' | '예약 취소';
  imgUrl: string;
};

/**
 * 서버에서 WebSocket으로 전달되는 알림 원본 데이터
 */
export type ReservationNotification = {
  reservationId: number;
  roomName: string;
  confirmedDate: string;
  roomOwnerName: string;
};

/**
 * 클라이언트에서 모달 표시용으로 쓰는 확장 데이터 타입
 */
export type ReservationPayload = ReservationNotification & {
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
    reservationId: number;
    title: string;
    imageUrl: string;
    viewStatus: 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    dDay: number;
    startDate: string;
    endDate: string;
};
export type ReservationsResponse = Paged<ReservationsListResponse>;

