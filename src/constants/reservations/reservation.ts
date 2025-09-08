export const RESERV_URL = '/reservations';
export const ADMIN_RESERV_URL = '/admin/reservations';

export const RESERV_STATUSES = ['전체', '예약 중', '예약 확정', '예약 취소'] as const;

export const STATUS_MAP: Record<(typeof RESERV_STATUSES)[number], string> = {
  전체: 'ALL',
  '예약 중': 'RESERVED',
  '예약 확정': 'COMPLETED',
  '예약 취소': 'CANCELLED',
};
