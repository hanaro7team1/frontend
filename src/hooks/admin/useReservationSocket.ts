'use client';

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect } from 'react';
import { ReservationNotification } from '@/types/reservation';

export function useReservationSocket(
  memberId: number,
  onMessage: (payload: ReservationNotification) => void,
) {
  useEffect(() => {
    if (!memberId) return;

    const socket = new SockJS('http://localhost:8082/ws');
    const stompClient = new Client({ webSocketFactory: () => socket as any });

    stompClient.onConnect = () => {
      stompClient.subscribe(`/topic/reservations/${memberId}`, (message: { body: string }) => {
        const payload: ReservationNotification = JSON.parse(message.body);
        onMessage(payload);
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [memberId, onMessage]);
}
