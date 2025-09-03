'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { privateApi } from '@/lib/axios-client';
import { Txt } from '@/components/atoms';
import { Modal } from '@/components/common';

type Props = {
  id: string;
};

export default function CancelBtn({ id }: Props) {
  const router = useRouter();

  const [isModalOpened, setModalOpened] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await privateApi.delete(`/api/reservations/${id}`);

      if (res.status === 204) {
        alert('예약이 취소되었습니다.');
        setModalOpened(false);
        router.push('/reservations?reservationStatus=취소됨');
      } else {
        alert('예약 취소에 실패했습니다. 다시 시도해주세요.');
        setModalOpened(false);
      }
    } catch (error) {
      alert('예약 취소 중 오류가 발생했습니다. 다시 시도해주세요.');
      setModalOpened(false);
    }
  };

  return (
    <>
      <button
        className='bg-black-626/10 h-[50px] rounded-[10px] py-2'
        onClick={() => setModalOpened(true)}
      >
        <Txt>예약 취소하기</Txt>
      </button>

      {isModalOpened && (
        <Modal
          rightBtnText='네'
          leftBtnText='아니요'
          onClickRightBtn={handleDelete}
          onClickLeftBtn={() => setModalOpened(false)}
        >
          정말 취소할까요?
        </Modal>
      )}
    </>
  );
}
