'use client';

import { MouseEvent, useState } from 'react';
import { Txt } from '@/components/atoms';

export default function OpenDateModalBtn() {
  //TODO: 모달 컴포넌트 추가 및 isModalOpened 값에 따라 모달 열기/닫기 처리
  const [isModalOpened, setModalOpened] = useState(false);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalOpened(true);
  };

  return (
    <button
      className='bg-pink-09f flex h-[50px] w-full items-center justify-center rounded-[10px] py-2'
      onClick={handleClick}
    >
      <Txt className='leading-5 text-white' size={16}>
        예약 가능 날짜
        <br /> 변경하기
      </Txt>
    </button>
  );
}
