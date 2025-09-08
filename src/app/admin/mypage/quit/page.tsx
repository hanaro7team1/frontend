'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Txt } from '@/components/atoms';
import { Header, Modal } from '@/components/common';
import { PasswordField } from '@/components/domain/admin/auth/PasswordField';
import { authApi, privateApi } from '@/lib/axios-client';

export type pwdCheck = {
  checkPassword: string;
};

export default function AdminQuitPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [password, setPassword] = useState<string>('');

  const handleQuitLogout = async () => {
    try {
      const res = await privateApi.delete<pwdCheck>(`/api/admin/mypage/quit`, {
        data: {checkPassword: password},
    });

    if (res.data?.checkPassword) {
      setPassword(res.data.checkPassword);
    }

      await authApi.logout();
      router.replace('/auth');
    } catch (err) {
      console.error('탈퇴 실패:', err);
    }
  };

  return (
    <>
      <Header className='mb-[50px]' title='회원 탈퇴' />

      <div className='flex flex-col gap-5 p-8'>
        <Txt size={24}>비밀번호 확인</Txt>
        <PasswordField
          value={password}
          placeholder={'비밀번호를 입력해 주세요'}
          onChange={setPassword}
        />
        <Button title='탈퇴하기' color='pink' onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && (
        <Modal
          isPink
          leftBtnText='아니요'
          rightBtnText='네'
          onClickLeftBtn={() => router.back()}
          onClickRightBtn={handleQuitLogout}
        >
          정말 탈퇴하시겠어요?
        </Modal>
      )}
    </>
  );
}
