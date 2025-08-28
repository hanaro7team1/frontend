'use client';

import { DateRange } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button, Txt } from '@/components/atoms';
import { BottomSheet } from '@/components/common';
import { Calendar } from '@/components/ui/calendar';
import { SheetClose } from '@/components/ui/sheet';
import { formatDate, getDefaultDates } from '@/utils/stays/stays';

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hasTrigger?: boolean;
};

export default function BottomSheetSchedule({ open, onOpenChange, hasTrigger = true }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const prevSearchParam = searchParams.get('schedule');
  const [defaultFrom, defaultTo] = prevSearchParam?.split('-') ?? getDefaultDates();

  // 선택된 입퇴실 날짜. default value는 searchParam에서 가져옴
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(defaultFrom),
    to: new Date(defaultTo),
  });

  // 오늘 00시 00분 00초값 계산. 오늘 이전 날짜는 disabled되도록 처리할 때 쓰임
  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const handleReset = () => setDateRange(undefined);
  const handleDone = () => {
    const params = new URLSearchParams(searchParams);
    params.set('schedule', `${formatDate(dateRange?.from)}\n-${formatDate(dateRange?.to)}`);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} hasTrigger={hasTrigger}>
      <div className='flex flex-col gap-4 p-4'>
        <Txt size={24} align='center'>
          입실 날짜와 퇴실 날짜를
          <br />
          차례대로 선택하세요
        </Txt>

        <Calendar
          selected={dateRange}
          onSelect={setDateRange}
          disabled={(date) => date < todayDate}
          defaultMonth={dateRange?.from}
          timeZone='+09:00'
          locale={ko}
          mode='range'
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
