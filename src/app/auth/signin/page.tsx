'use client'

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import type React from 'react';
import { FormEvent, useState } from 'react';
import { PasswordField } from '@/components/domain/admin/auth/PasswordField';

export default function SignInPage() {
  

  return (
    <div>
      {/* <Image src='/images/Img_SIDO_LOGO.png' alt='시도 로고' width={86} height={86} /> */}
      로그인

      {/* <PasswordField placeholder='비밀번호를 입력해 주세요' /> */}
      
    </div>

  );
}
