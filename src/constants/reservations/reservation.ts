export const RESERV_URL = '/reservations';

export const RESERV_STATUSES = [
  { label: '전체', href: '/reservations?reservationStatus=전체' },
  { label: '예약됨', href: '/reservations?reservationStatus=예약됨' },
  { label: '방문 완료', href: '/reservations?reservationStatus=방문 완료' },
  { label: '취소됨', href: '/reservations?reservationStatus=취소됨' },
];

export const STATUS_MAP: Record<string, string> = {
  전체: 'ALL',
  예약됨: 'RESERVED',
  '방문 완료': 'COMPLETED',
  취소됨: 'CANCELLED',
};
