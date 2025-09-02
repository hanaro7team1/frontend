'use client';

import { useState } from 'react';
import { Txt } from '@/components/atoms';
import { Modal } from '@/components/common';

type Props = {
  id: string;
};

export default function CancelBtn({ id }: Props) {
  // TODO: 추후에 세션에서 관리자 여부 읽어오기
  const isAdmin = false;
  if (isAdmin) return null;

  const [isModalOpened, setModalOpened] = useState(false);

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
          onClickRightBtn={() => alert(id + '번 예약 취소')}
          onClickLeftBtn={() => setModalOpened(false)}
        >
          정말 취소할까요?
        </Modal>
      )}
    </>
  );
}
