'use client';

import { DateRange } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button, Txt } from '@/components/atoms';
import { BottomSheet } from '@/components/common';
import { Calendar } from '@/components/ui/calendar';
import { SheetClose } from '@/components/ui/sheet';
import { usePublicData } from '@/hooks/api/useApi';
import { formatDate, getDefaultDates, parseDateString } from '@/utils/stays/stays';
import { StayAvailableDatesResponse } from '@/types/stays';

export default function BottomSheetScheduleDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const prevSearchParam = searchParams.get('schedule');
  const [defaultFrom, defaultTo] =
    prevSearchParam?.split('-').map(parseDateString) ?? getDefaultDates();

  // 선택된 입퇴실 날짜. default value는 searchParam에서 가져옴
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(defaultFrom),
    to: new Date(defaultTo),
  });

  const stayId = pathname.split('/').at(-1);
  const { data: disabledDates } = usePublicData<StayAvailableDatesResponse>(
    `/api/stays/${stayId}/available-dates`,
  );

  const handleReset = () => setDateRange(undefined);
  const handleDone = () => {
    const params = new URLSearchParams(searchParams);
    params.set('schedule', `${formatDate(dateRange?.from)}\n-${formatDate(dateRange?.to)}`);
    router.replace(`${pathname}?${params.toString()}`);
  };

  // disabled 날짜 체크
  const isDateDisabled = (date: Date) => {
    return disabledDates?.dates
      ? !disabledDates.dates.includes(date.toISOString().split('T')[0])
      : false;
  };

  const handleDateSelect = (newDateRange: DateRange) => {
    if (!newDateRange || !disabledDates?.dates) {
      setDateRange(newDateRange);
      return;
    }

    if (newDateRange.from && !newDateRange.to) {
      setDateRange(newDateRange);
      return;
    }

    if (newDateRange.from && newDateRange.to) {
      let adjustedTo = newDateRange.to;
      const currentDate = new Date(newDateRange.from);

      // 선택된 입실 날짜 - 퇴실 날짜 사이에 disabled 날짜가 있으면 퇴실 날짜를 disabled 날짜 전날로 조정
      while (currentDate <= newDateRange.to) {
        // 로컬 시간대 기준으로 YYYY-MM-DD 형식 생성
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        if (!disabledDates.dates.includes(dateStr)) {
          const prevDate = new Date(currentDate);
          prevDate.setDate(prevDate.getDate() - 1);
          adjustedTo = prevDate;
          break;
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      setDateRange({
        from: newDateRange.from,
        to: adjustedTo,
      });
    }
  };

  return (
    <BottomSheet>
      <div className='flex flex-col gap-4 p-4'>
        <Txt size={24} align='center'>
          입실 날짜와 퇴실 날짜를
          <br />
          차례대로 선택하세요
        </Txt>

        <Calendar
          selected={dateRange}
          onSelect={handleDateSelect}
          disabled={isDateDisabled}
          defaultMonth={dateRange?.from}
          timeZone='+09:00'
          locale={ko}
          mode='range'
          required
        />

        <div className='flex gap-2'>
          <Button
            title='초기화'
            color='gray'
            onClick={handleReset}
            disabled={!dateRange}
            className='h-[50px]'
          />
          <SheetClose
            onClick={handleDone}
            disabled={!dateRange}
            className='bg-green-49d disabled:bg-green-49d/50 flex h-[50px] w-full items-center justify-center rounded-[10px] py-[11px]'
          >
            <Txt className='text-white'>완료</Txt>
          </SheetClose>
        </div>
      </div>
    </BottomSheet>
  );
}
