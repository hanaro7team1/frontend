'use client';

import { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { privateApi } from '@/lib/axios-client';
import { Txt } from '@/components/atoms';
import { FixedBottomButton, Modal } from '@/components/common';
import { BottomSheetPeopleCount, BottomSheetScheduleDetail } from '@/components/domain/stays';
import { formatDate, getDefaultDates } from '@/utils/stays/stays';

type Props = {
  id: number;
  onReserve?: () => void;
  onInquiry?: () => void;
  schedule?: string;
  peopleCount?: string;
  capacity: number;
};

export default function CityActionBar({
  id,
  onReserve,
  onInquiry,
  schedule,
  peopleCount,
  capacity,
}: Props) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [today, twoDaysLater] = getDefaultDates();
  // URL의 schedule 값은 'YY.MM.DD\n-YY.MM.DD' 형태이므로, 표시를 위해 \n을 -로 바꿈.
  const displaySchedule =
    schedule?.replace('\n', '') ?? `${formatDate(today)}-${formatDate(twoDaysLater)}`;
  const displayPeopleCount = peopleCount ?? '2';

  const searchParam = useSearchParams();
  const searchParams = Object.fromEntries(searchParam.entries());

  const handleReserve = async () => {
    try {
      const req = {
        startDate: '20' + displaySchedule.split('-')[0].replaceAll('.', '-'),
        endDate: '20' + displaySchedule.split('-')[1].replaceAll('.', '-'),
        personCnt: searchParams.peopleCount ?? 2,
      };

      const res = await privateApi.post(`/api/stays/${id}/reservations`, req);

      const params = new URLSearchParams(searchParams);
      params.set('schedule', displaySchedule);
      params.set('peopleCount', displayPeopleCount);

      if (res.status === 201) {
        router.push(
          `/stays/${id}/booking?${params.toString()}&reservationId=${res.data.reservationId}`,
        );
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      alert(
        (axiosError.response?.data as { message?: string })?.message ??
          '예약에 실패했습니다. 다시 시도해주세요.',
      );
    }
  };

  return (
    <>
      <FixedBottomButton
        leftBtnText='전화로 문의하기'
        rightBtnText='예약하기'
        onClickLeftBtn={handleOpenModal}
        onClickRightBtn={onReserve ?? handleReserve}
      >
        <div className='border-black-626/15 space-y-4 rounded-[15px] border px-6.5 py-5'>
          {/* 일정 */}
          <div className='flex items-center gap-3'>
            <div className='flex min-w-fit items-center gap-4'>
              <Txt size={16}>일정</Txt>
              <Txt>{displaySchedule}</Txt>
            </div>
            <BottomSheetScheduleDetail />
          </div>

          {/* 인원 */}
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-4'>
              <Txt size={16}>인원</Txt>
              <Txt>{displayPeopleCount}명</Txt>
            </div>
            <BottomSheetPeopleCount capacity={capacity} />
          </div>
        </div>
      </FixedBottomButton>

      {/* 전화 확인 모달 */}
      {isModalOpen && (
        <Modal
          leftBtnText='취소'
          rightBtnText='전화 걸기'
          onClickLeftBtn={handleCloseModal}
          onClickRightBtn={() => {
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
