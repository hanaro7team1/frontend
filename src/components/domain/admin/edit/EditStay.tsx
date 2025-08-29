'use client';

import { SquareRoundCorner, Users } from 'lucide-react';
import { useState } from 'react';
import { Input, ShadowBox, Txt } from '@/components/atoms';
import { FixedBottomButton } from '@/components/common';
import { InfoRow } from '../../reservations';
import { BottomSheetArea, BottomSheetCapacity } from '../../stays';

type Props = {
  data: {
    area: number;
    capacity: number;
    description: string;
  };
};

export default function EditStay({ data }: Props) {
  const { area, capacity, description } = data;

  const [newArea, setNewArea] = useState([area]);
  const [newCapacity, setNewCapacity] = useState(capacity);

  return (
    <>
      <div className='flex flex-col gap-4'>
        <Txt size={22}>사랑방 정보 수정</Txt>
        <div className='flex flex-col gap-3'>
          <ShadowBox className='gap-3.5 px-3.5 py-3'>
            <InfoRow icon={SquareRoundCorner} label='면적' value={newArea + ''} />
            <BottomSheetArea newArea={newArea} setNewArea={setNewArea} />
          </ShadowBox>
          <ShadowBox className='gap-3.5 px-3.5 py-3'>
            <InfoRow icon={Users} label='최대 수용 인원' value={newCapacity + ''} />
            <BottomSheetCapacity newCapacity={newCapacity} setNewCapacity={setNewCapacity} />
          </ShadowBox>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <Txt size={22}>사랑방에 대해 상세하게 알려주세요</Txt>

        <Input
          defaultValue={description}
          placeholder='사랑방을 소개해주세요'
          tag='textarea'
          className='resize-none'
        />
      </div>

      <FixedBottomButton
        leftBtnText='취소하기'
        onClickLeftBtn={() => alert('취소')}
        rightBtnText={'수정 완료하기'}
        onClickRightBtn={() => alert('수정완료')}
        isPink
      />
    </>
  );
}
