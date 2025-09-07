'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Txt } from '@/components/atoms';
import { Header, Modal } from '@/components/common';
import { PasswordField } from '@/components/domain/admin/auth/PasswordField';

export default function AdminQuitPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const [password, setPassword] = useState('');

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
        <Button title='탈퇴하기' color='pink' onClick={openModal} />
      </div>

      {isModalOpen && (
        <Modal
          leftBtnText='아니요'
          rightBtnText='네'
          onClickLeftBtn={() => router.back()}
          onClickRightBtn={() => router.push('/auth')}
        >
          정말 탈퇴하시겠어요?
        </Modal>
      )}
    </>
  );
}
