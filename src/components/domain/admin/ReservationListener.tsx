'use client';

import { useState } from 'react';
import { useReservationSocket } from '@/hooks/admin/useReservationSocket';
import { getMemberId } from '@/utils/auth/auth-memberId';
import { ReservationStatusEnum } from '@/enums/reservation';
import { ReservationPayload } from '@/types/reservation';
import ReservationModal from './ReservationModal';

export default function ReservationListener() {
  const [payload, setPayload] = useState<ReservationPayload | null>(null);
  const memberId = getMemberId();

  useReservationSocket(memberId!, (msg) => {
    setPayload({ ...msg, status: ReservationStatusEnum.RESERVED });
  });

  return payload ? <ReservationModal payload={payload} /> : null;
}
