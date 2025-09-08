'use client';

import { Txt } from '@/components/atoms';
import { BottomSheet } from '@/components/common';
import { SheetClose } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';

type Props = {
  newArea: number[];
  setNewArea: (newArea: number[]) => void;
};

export default function BottomSheetArea({ newArea, setNewArea }: Props) {
  const handleDone = () => {
    setNewArea(newArea);
  };

  return (
    <BottomSheet>
      <div className='flex flex-col items-center gap-10 p-4'>
        <Txt size={24} align='center'>
          사랑방의 면적을 입력하세요
        </Txt>

        <Txt>약 {newArea}평</Txt>

        <Slider
          value={newArea}
          defaultValue={newArea}
          onValueChange={setNewArea}
          max={100}
          step={1}
          className='w-[80%]'
        />

        <SheetClose
          onClick={handleDone}
          className='bg-green-49d flex h-[50px] w-full items-center justify-center rounded-[10px] py-[11px]'
        >
          <Txt className='text-white'>완료</Txt>
        </SheetClose>
      </div>
    </BottomSheet>
  );
}
