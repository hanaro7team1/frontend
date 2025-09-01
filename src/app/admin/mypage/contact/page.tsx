'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button, Input, Txt } from '@/components/atoms';
import { Header } from '@/components/common';
import NoticeModal from '@/components/domain/admin/mypage/NoticeModal';
import { phoneHyphen } from '@/utils/common/phoneHyphen';

export default function AdminContactPage() {
  // db
  const hostPhone = '010-1234-1234';

  const [phone, setPhone] = useState(hostPhone);
  const [newPhone, setNewPhone] = useState('');
  const [openNotice, setOpenNotice] = useState(false);

  const editPhone = () => {
    setPhone(newPhone.trim());
    setOpenNotice(true);
  };

  return (
    <>
      <Header title='전화번호 변경' />

      <div className='flex flex-col gap-4 p-8'>
        <Txt size={24} className='text-gray-070'>
          기존 전화번호
        </Txt>
        <div className='flex items-center gap-3'>
          <Image src='/icons/Ic_Phone_big.svg' alt='수화기' width={35} height={35} />
          <Txt size={24}>{phone}</Txt>
        </div>

        <div className='mt-[30px] flex flex-col gap-4'>
          <Txt size={24} className='text-gray-070'>
            변경할 전화번호
          </Txt>
          <Input
            value={phoneHyphen(newPhone)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPhone(e.target.value)}
            placeholder='변경할 전화번호를 입력하세요'
          />
        </div>

        <Button title='변경하기' color='pink' onClick={editPhone} />
      </div>

      <NoticeModal open={openNotice} text='전화번호' />
    </>
  );
}
