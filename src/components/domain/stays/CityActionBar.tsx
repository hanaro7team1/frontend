'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Txt } from '@/components/atoms';
import { FixedBottomButton, Modal } from '@/components/common';
import { BottomSheetPeopleCount, BottomSheetSchedule } from '@/components/domain/stays';
import { formatDate, getDefaultDates } from '@/utils/stays/stays';

type Props = {
  id: string;
  onReserve?: () => void;
  onInquiry?: () => void;
  schedule?: string;
  peopleCount?: string;
};

export default function CityActionBar({ id, onReserve, onInquiry, schedule, peopleCount }: Props) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [today, twoDaysLater] = getDefaultDates();
  // URL의 schedule 값은 'YY.MM.DD\n-YY.MM.DD' 형태이므로, 표시를 위해 \n을 -로 바꿈.
  const displaySchedule =
    schedule?.replace('\n', '') ?? `${formatDate(today)} - ${formatDate(twoDaysLater)}`;
  const displayPeopleCount = peopleCount ?? '2';

  return (
    <>
      <FixedBottomButton
        leftBtnText='전화로 문의하기'
        rightBtnText='예약하기'
        onClickLeftBtn={handleOpenModal}
        onClickRightBtn={onReserve ?? (() => router.push(`/stays/${id}/booking`))}
      >
        <div className='border-black-626/15 space-y-4 rounded-[15px] border px-6.5 py-5'>
          {/* 일정 */}
          <div className='flex items-center justify-between'>
            <div className='flex min-w-fit items-center gap-4'>
              <Txt size={16}>일정</Txt>
              <Txt>{displaySchedule}</Txt>
            </div>
            <BottomSheetSchedule triggerBtnType='detail' />
          </div>

          {/* 인원 */}
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-4'>
              <Txt size={16}>인원</Txt>
              <Txt>{displayPeopleCount}명</Txt>
            </div>
            <BottomSheetPeopleCount triggerBtnType='detail' />
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
