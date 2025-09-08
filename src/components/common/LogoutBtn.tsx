'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authApi } from '@/lib/axios-client';
import { Txt } from '@/components/atoms';
import { Modal } from '@/components/common';

const LogoutBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      router.replace('/auth'); // 로그인 페이지로 이동
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  return (
    <>
      <button
        type='button'
        onClick={() => setIsModalOpen(true)}
        className='text-gray-070/50 block underline underline-offset-2'
      >
        <Txt size={16} align='center' className='text-gray-070/50'>
          로그아웃
        </Txt>
      </button>

      {isModalOpen && (
        <Modal
          rightBtnText='네'
          leftBtnText='아니요'
          onClickLeftBtn={() => setIsModalOpen(false)}
          onClickRightBtn={handleLogout}
        >
          로그아웃 하시겠어요?
        </Modal>
      )}
    </>
  );
};

export default LogoutBtn;
