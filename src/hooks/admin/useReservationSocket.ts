'use client';

import { Client } from '@stomp/stompjs';
import { useEffect } from 'react';
import { ReservationNotification } from '@/types/reservation';

export function useReservationSocket(
  memberId: number,
  onMessage: (payload: ReservationNotification) => void,
) {
  useEffect(() => {
    if (!memberId) return;

    const stompClient = new Client({
      brokerURL: 'ws://localhost:8082/ws',
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe(`/topic/reservations/${memberId}`, (message) => {
          const payload: ReservationNotification = JSON.parse(message.body);
          onMessage(payload);
        });
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [memberId, onMessage]);
}
