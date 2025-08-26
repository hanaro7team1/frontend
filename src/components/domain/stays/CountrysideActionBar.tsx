'use client';

import { useState } from 'react';
import Button from '@/components/atoms/Button';
import Modal from '@/components/common/Modal';

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
      <div className='border-black-626/15 fixed bottom-0 w-full max-w-[412px] flex gap-3 border-t bg-white p-4'>
        <Button title='사랑방 삭제하기' color='gray' onClick={handleOpenModal} />
        <Button title='내용 수정하기' color='pink' onClick={onEdit} />
      </div>

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
