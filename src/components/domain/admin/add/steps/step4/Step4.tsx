import { useState } from 'react';
import { Input, Txt } from '@/components/atoms';
import { phoneHyphen } from '@/utils/common/phoneHyphen';

export default function AddOwner() {
  const [newPhone, setNewPhone] = useState('');

  return (
    <>
      <Txt>사랑방 주인의 성함은 무엇인가요?</Txt>
      <div className='mb-10 flex gap-4'>
        <Input placeholder={''} />
        <Txt size={25} className='pr-30'>
          님
        </Txt>
      </div>
      <Txt>사랑방 주인의 전화번호를 입력하세요</Txt>
      <Input
        placeholder='예시) 01012345567'
        value={phoneHyphen(newPhone)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPhone(e.target.value)}
      />
    </>
  );
}
