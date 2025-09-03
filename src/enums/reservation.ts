export enum ReservationStatus {
  PENDING = 'PENDING', // 예약하기
  RESERVED = 'RESERVED', // 예약 확정
  CANCELLED = 'CANCELLED', // 예약 취소
}

export enum ReservationViewStatus {
  UPCOMING = '방문 전',
  IN_PROGRESS = '방문 중',
  COMPLETED = '방문 완료',
  CANCELLED = '예약 취소',
}
