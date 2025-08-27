'use client';

import { useState } from 'react';
import { Txt } from '@/components/atoms';
import { FixedBottomButton, Modal } from '@/components/common';
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
      <FixedBottomButton
        leftBtnText='전화로 문의하기'
        rightBtnText='예약하기'
        onClickLeftBtn={handleOpenModal}
        onClickRightBtn={onReserve ?? (() => {})}
      >
        <div className='border-black-626/15 space-y-4 rounded-[15px] border px-6.5 py-5'>
          {/* 일정 */}
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-4 min-w-fit'>
              <Txt size={16} align='center'>
                일정
              </Txt>
              <Txt align='center'>25.09.20 - 25.09.23</Txt>
            </div>
            <EditButton />
          </div>

          {/* 인원 */}
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-4'>
              <Txt size={16} align='center'>인원</Txt>
              <Txt align='center'>2명</Txt>
            </div>
            <EditButton />
          </div>
        </div>
      </FixedBottomButton>

      {/* 전화 확인 모달 */}
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
