'use client';

import { useState } from 'react';
import { privateApi } from '@/lib/axios-client';
import { ReservationStats } from '@/components/domain/admin';
import { useReservationSocket } from '@/hooks/admin/useReservationSocket';
import { getMemberId } from '@/utils/auth/auth-memberId';
import { AdminReservationResponse } from '@/types/admin';

type Props = {
  initialData: AdminReservationResponse;
};

export default function ReservationStatsContainer({ initialData }: Props) {
  const [stats, setStats] = useState(initialData);
  const memberId = getMemberId();

  const { upcomingCnt, inProgressCnt, completedCnt } = stats;

  // 소켓 알림 수신 → 예약 현황 조회 API 다시 호출
  useReservationSocket(memberId!, async () => {
    try {
      const { data } = await privateApi.get<AdminReservationResponse>(
        '/api/admin/reservations/overview',
      );
      setStats(data);
    } catch (err) {
      console.error('예약 현황 갱신 실패:', err);
    }
  });

  return (
    <ReservationStats
      upcomingCnt={upcomingCnt}
      inProgressCnt={inProgressCnt}
      completedCnt={completedCnt}
    />
  );
}
