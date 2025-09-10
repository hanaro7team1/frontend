'use client';

import { useEffect, useState } from 'react';
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

  const fetchStats = async () => {
    try {
      const { data } = await privateApi.get<AdminReservationResponse>(
        '/api/admin/reservations/overview',
      );
      setStats(data);
    } catch (err) {
      console.error('예약 현황 갱신 실패:', err);
    }
  };

  // 소켓 알림 수신 → 예약 현황 갱신
  useReservationSocket(memberId!, fetchStats);

  // 최초 마운트 시 예약 현황 갱신
  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <ReservationStats
      upcomingCnt={upcomingCnt}
      inProgressCnt={inProgressCnt}
      completedCnt={completedCnt}
    />
  );
}
