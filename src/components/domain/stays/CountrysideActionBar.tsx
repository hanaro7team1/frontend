'use client';

import { useState } from 'react';
import { FixedBottomButton, Modal } from '@/components/common';

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function CountrysideActionBar({ onEdit, onDelete }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <FixedBottomButton
        leftBtnText='사랑방 삭제하기'
        rightBtnText='내용 수정하기'
        isPink
        onClickLeftBtn={handleOpenModal}
        onClickRightBtn={onEdit ?? (() => {})}
      />

      {/* 삭제 확인 모달 */}
      {isModalOpen && (
        <Modal
          grayBtnText='취소'
          greenBtnText='삭제하기'
          onClickGrayBtn={handleCloseModal}
          onClickGreenBtn={() => {
            if (onDelete) onDelete();
            handleCloseModal();
          }}
        >
          사랑방을 삭제하시겠습니까?
        </Modal>
      )}
    </>
  );
}


