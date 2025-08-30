'use client';

import Image from 'next/image';
import type React from 'react';
import { Button, Input, Txt } from '@/components/atoms';
import { PasswordField } from '@/components/domain/admin/auth/PasswordField';

export default function SignInPage() {
  const commonPosision = 'flex flex-col gap-3';

  return (
    <div className='bg-gray-7f9 flex min-h-svh flex-col justify-center gap-10 p-6'>
      <div className='flex flex-col items-center'>
        <Image src='/images/Img_SIDO_LOGO_2.png' alt='시도 로고' width={100} height={100} />
        <Txt className='text-gray-070'>시골과 도시의 연결</Txt>
      </div>

      <div className={`${commonPosision}`}>
        <Txt size={24}>아이디</Txt>
        <Input placeholder='아이디를 입력해 주세요' />
      </div>

      <div className={`${commonPosision}`}>
        <Txt size={24}>비밀번호</Txt>
        <PasswordField placeholder='비밀번호를 입력해 주세요' value={''} onChange={() => {}} />
      </div>

      <Button title='로그인' color='pink' />
    </div>
  );
}
