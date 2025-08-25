'use client';

import { CircleMinus, CirclePlus } from 'lucide-react';
import { useState } from 'react';
import { Input, Txt } from '@/components/atoms';

export default function AddCapacity() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Txt align='left'>사랑방의 최대 수용 가능 인원은 몇 명인가요</Txt>
      <div className='mb-10 flex justify-between px-[81px]'>
        <button onClick={() => setCount((prev) => Math.max(0, prev - 1))}>
          <CircleMinus size={40} color='var(--code-theme6)' />
        </button>
        <Txt size={30}>{count}명</Txt>
        <button onClick={() => setCount((prev) => prev + 1)}>
          <CirclePlus size={40} color='var(--code-theme6)' />
        </button>
      </div>
      <Txt align='left'>사랑방의 면적을 입력하세요</Txt>
      <div className='flex gap-4 px-[81px]'>
        <Txt align='left' size={30}>
          약
        </Txt>
        <Input placeholder={''}></Input>
        <Txt align='left' size={30}>
          평
        </Txt>
      </div>
    </>
  );
}
