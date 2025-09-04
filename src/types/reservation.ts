import { ReservationStatus } from '@/enums/reservation';
import { Paged } from './common';

export type ReservationPayload = {
  id: number;
  confirmedDate: string;
  hostName: string;
  roomName: string;
  status: ReservationStatus;
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