'use client';

import { CalendarCheck, HomeIcon, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Txt } from '@/components/atoms';
import Modal from '@/components/common/Modal';
import ModalInfo from './ModalInfo';

type ReservationPayload = {
  id: number;
  confirmedDate: string;
  hostName: string;
  roomName: string;
};

export default function ReservationModal({ payload }: { payload: ReservationPayload }) {
  const { id, confirmedDate, hostName, roomName } = payload;
  const [open, setOpen] = useState(false);

  const reservationInfo = [
    { label: '예약된 사랑방 이름', icon: HomeIcon, value: roomName },
    { label: '예약된 일정', icon: CalendarCheck, value: confirmedDate },
    { label: '사랑방 주인 이름', icon: User, value: hostName },
  ];
  const router = useRouter();

  return (
    <>
      <Button title='예약 알림 보기' onClick={() => setOpen(true)} />

      {open && (
        <Modal
          leftBtnText='닫기'
          rightBtnText='자세히 보기'
          onClickLeftBtn={() => setOpen(false)}
          onClickRightBtn={() => {
            router.push(`/reservations/${id}`); // 예약 상세 페이지로 이동
            setOpen(false);
          }}
          isPink={true}
        >
          <div className='flex flex-col items-center'>
            <Txt size={24} weight='bold' align='center' className='mb-2'>
              예약 확정 알림
            </Txt>
            <Txt className='mb-4' align='center'>
              사랑방 예약이 확정되었습니다.
              <br /> 아래 내용을 확인해 주세요.
            </Txt>

            <div className='bg-gray-7f9 flex flex-col gap-5 overflow-hidden rounded-md px-5 py-6 text-left'>
              {reservationInfo.map(({ label, icon, value }) => (
                <ModalInfo key={label} icon={icon} label={label} value={value} />
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
