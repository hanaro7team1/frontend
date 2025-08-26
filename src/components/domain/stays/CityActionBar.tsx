'use client';

import { useState } from 'react';
import { Txt } from '@/components/atoms';
import Button from '@/components/atoms/Button';
import Modal from '@/components/common/Modal';
import EditButton from './EditButton';

type Props = {
  onReserve?: () => void;
  onInquiry?: () => void;
};

export default function CityActionBar({ onReserve, onInquiry }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div className='border-black-626/15 fixed bottom-0 w-full border-t bg-white'>
        {/* 일정/인원 블록 */}
        <div className='border-black-626/15 m-4 space-y-4 rounded-[15px] border px-6.5 py-5'>
          <div className='flex items-center gap-4'>
            <Txt size={16}>일정</Txt>
            <div className='flex items-center gap-4'>
              <Txt>25.09.20 - 25.09.23</Txt>
              <EditButton />
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <Txt size={16}>인원</Txt>
            <div className='flex items-center gap-4'>
              <Txt>2명</Txt>
              <EditButton />
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
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
