'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FixedBottomButton, Modal } from '@/components/common';

type Props = {
  id: number;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function CountrysideActionBar({ id, onEdit, onDelete }: Props) {
  const router = useRouter();
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
        onClickRightBtn={
          onEdit ??
          (() => {
            router.push(`/admin/stays/${id}`);
          })
        }
      />

      {/* 삭제 확인 모달 */}
      {isModalOpen && (
        <Modal
          leftBtnText='취소'
          rightBtnText='삭제하기'
          onClickLeftBtn={handleCloseModal}
          onClickRightBtn={() => {
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
