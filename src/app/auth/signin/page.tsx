'use client'

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import type React from 'react';
import { FormEvent, useState } from 'react';
import { PasswordField } from '@/components/domain/admin/auth/PasswordField';
import Image from 'next/image';
import { Button, Input, Txt } from '@/components/atoms';

export default function SignInPage() {
  
  return (
    <div>
      <div>
        <Image src='/images/Img_SIDO_LOGO.png' alt='시도 로고' width={95} height={95}/>
        <Txt size={20} color='gray'>시골과 도시의 연결</Txt>
      </div>
      
      <div>
        <Txt size={24}>아이디</Txt>
        <Input placeholder='아이디를 입력해 주세요' />
      </div>
      
      <div>
        <Txt size={24}>비밀번호</Txt>
        <PasswordField placeholder='비밀번호를 입력해 주세요' value={''} onChange={()=>{} } />
      </div>
      
      <Button title='로그인' color='pink' />
    </div>
  );
}
