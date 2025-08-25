'use client';

import { useState } from 'react';
import { Txt } from '@/components/atoms';
import Button from '@/components/atoms/Button';
import Modal from '@/components/common/Modal';
import EditButton from './EditButton';

type Props = {
  mode?: 'city' | 'countryside';
  onReserve?: () => void;
  onInquiry?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function StayActionBar({
  mode = 'city',
  onReserve,
  onInquiry,
  onEdit,
  onDelete,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (mode === 'city') {
    return (
      <>
        <div className='border-black-626/15 fixed right-0 bottom-0 left-0 border-t bg-white'>
          <div className='border-black-626/15 m-4 space-y-4 rounded-[15px] border px-6.5 py-5'>
            <div className='flex items-center gap-4'>
              <Txt size={16} weight='cm'>
                일정
              </Txt>
              <div className='flex items-center gap-4'>
                <Txt size={20}>25.09.20 - 25.09.23</Txt>
                <EditButton />
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <Txt size={16} weight='cm'>
                인원
              </Txt>
              <div className='flex items-center gap-4'>
                <Txt size={20}>2명</Txt>
                <EditButton />
              </div>
            </div>
          </div>

          <div className='flex gap-3 px-4 pb-3'>
            <Button title='전화로 문의하기' color='gray' onClick={handleOpenModal} />
            <Button title='예약하기' color='green' onClick={onReserve} />
          </div>
        </div>

        {/* 전화 문의 모달 */}
        {isModalOpen && (
          <Modal
            grayBtnText='취소'
            greenBtnText='전화 걸기'
            onClickGrayBtn={handleCloseModal}
            onClickGreenBtn={() => {
              if (onInquiry) onInquiry();
              handleCloseModal();
            }}
          >
            마을 이장님께 전화를 걸까요?
          </Modal>
        )}
      </>
    );
  }

  return (
    <>
      <div className='border-black-626/15 fixed right-0 bottom-0 left-0 flex gap-3 border-t bg-white p-4'>
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
