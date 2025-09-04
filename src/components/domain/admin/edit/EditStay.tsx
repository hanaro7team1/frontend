'use client';

import { SquareRoundCorner, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { privateApi } from '@/lib/axios-client';
import { Input, ShadowBox, Txt } from '@/components/atoms';
import { FixedBottomButton, Modal } from '@/components/common';
import { InfoRow } from '../../reservations';
import { BottomSheetArea, BottomSheetCapacity } from '../../stays';

type Props = {
  data: {
    areaSize: number;
    capacity: number;
    description: string;
    stayId: number;
  };
};

export default function EditStay({ data }: Props) {
  const router = useRouter();
  const { areaSize, capacity, description, stayId } = data;

  const [newArea, setNewArea] = useState([areaSize]);
  const [newCapacity, setNewCapacity] = useState(capacity);
  const [newDescription, setNewDescription] = useState(description);

  const [isOpen, setIsOpened] = useState(false);

  const payload = {
    capacity: newCapacity,
    areaSize: newArea[0],
    description: newDescription,
  };

  const submitHandler = async () => {
    try {
      await privateApi.patch(`api/admin/stays/${stayId}`, payload);
      setIsOpened(true);
    } catch (e) {
      //TODO: 시간 남으면 토스트 처리...
      alert(e);
    }
  };

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
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>

      <FixedBottomButton
        leftBtnText='취소하기'
        onClickLeftBtn={() => alert('취소')}
        rightBtnText='수정 완료하기'
        onClickRightBtn={() => submitHandler()}
        isPink
      />
      {isOpen && (
        <Modal
          rightBtnText={'확인'}
          leftBtnText={'취소'}
          onClickRightBtn={() => {
            setIsOpened(false);
            router.push(`/stays/${stayId}`);
          }}
          onClickLeftBtn={() => setIsOpened(false)}
          isPink
        >
          등록이 완료되었습니다
        </Modal>
      )}
    </>
  );
}
