import { ReservationStatus } from '@/enums/reservation';

/**
 * 서버에서 WebSocket으로 전달되는 알림 원본 데이터
 */
export type ReservationNotification = {
  id: number;
  confirmedDate: string;
  hostName: string;
  roomName: string;
};

/**
 * 클라이언트에서 모달 표시용으로 쓰는 확장 데이터 타입
 */
export type ReservationPayload = ReservationNotification & {
  status: ReservationStatus;
};
