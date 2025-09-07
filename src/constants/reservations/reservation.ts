export const RESERV_URL = '/reservations';
export const ADMIN_RESERV_URL = '/admin/reservations';

export const RESERV_STATUSES = ['전체', '예약됨', '방문 완료', '취소됨'] as const;

export const STATUS_MAP: Record<(typeof RESERV_STATUSES)[number], string> = {
  전체: 'ALL',
  예약됨: 'RESERVED',
  '방문 완료': 'COMPLETED',
  취소됨: 'CANCELLED',
};
