import { useState } from 'react';
import { Input, Txt } from '@/components/atoms';
import { MAX_LENGTH } from '@/constants/admin/add/AddDescription';
import AiInfo from './AiInfo';

export default function AddDescription() {
  const [text, setText] = useState('');
  return (
    <>
      <Txt align='left'>사랑방에 대해서 상세하게 알려주세요</Txt>
      <div className='relative w-full'>
        <Input
          placeholder={''}
          tag='textarea'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='border-gray-6d6 resize-none border'
        />
        <div className='absolute right-3 bottom-2 text-gray-400'>
          {text.length} / {MAX_LENGTH}
        </div>
      </div>
      <AiInfo />
    </>
  );
}
