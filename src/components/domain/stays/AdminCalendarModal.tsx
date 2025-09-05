'use client';

import { ko } from 'react-day-picker/locale';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { privateApi } from '@/lib/axios-client';
import { Txt } from '@/components/atoms';
import { Modal } from '@/components/common';
import { Calendar } from '@/components/ui/calendar';
import { usePrivateData } from '@/hooks/api/useApi';
import { AdminStayAvailableDatesResponse } from '@/types/admin';

type Props = {
  stayId?: number;
  closeModal: () => void;
};

export default function AdminCalendarModal({ stayId, closeModal }: Props) {
  const router = useRouter();

  const { data } = usePrivateData<AdminStayAvailableDatesResponse>(
    `/api/admin/stays/${stayId}/open-dates`,
  );

  const [dates, setDates] = useState<Date[] | undefined>([]);

  const getReservedDayAndBefore = (day: Date) => {
    const iso = day.toISOString().split('T')[0];
    return day < todayDate || (data?.reservedDates ? data.reservedDates.includes(iso) : false);
  };

  const handleDone = async () => {
    const newDates = dates?.map((d) => d.toISOString().split('T')[0]) || [];

    const { status } = await privateApi.post(`/api/admin/stays/${stayId}/open-dates`, newDates);

    closeModal();

    if (status !== 200) {
      alert('예약 가능 날짜 수정에 실패했습니다. 다시 시도해주세요.');
      return;
    }

    alert('예약 가능 날짜가 수정되었습니다.');
    router.refresh();
  };

  // 오늘 00시 00분 00초값 계산. 오늘 이전 날짜는 disabled되도록 처리할 때 쓰임
  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  useEffect(() => {
    // 초기 예약 열린 날짜 세팅
    if (data?.openDates) {
      setDates(data.openDates.map((d) => new Date(d)));
    }
  }, [data]);

  return (
    <Modal
      rightBtnText='수정 완료'
      leftBtnText='취소'
      onClickRightBtn={handleDone}
      onClickLeftBtn={closeModal}
      isPink
    >
      <div className='flex flex-col gap-4'>
        <Txt align='center'>
          예약 가능한 날짜를 모두 선택하세요
          <br /> 다시 한번 선택하면 해제됩니다
        </Txt>

        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-around gap-4'>
            <div className='flex gap-2'>
              <div className='bg-pink-a76/50 size-6 rounded-[5px]' />
              <Txt size={16} className='text-gray-070'>
                이미 예약된 날
              </Txt>
            </div>
            <div className='flex gap-2'>
              <div className='bg-pink-a76 size-6 rounded-[5px]' />
              <Txt size={16} className='text-gray-070'>
                예약 가능한 날
              </Txt>
            </div>
          </div>

          <Calendar
            selected={dates}
            onSelect={setDates}
            disabled={getReservedDayAndBefore}
            timeZone='+09:00'
            locale={ko}
            mode='multiple'
          />
        </div>
      </div>
    </Modal>
  );
}
