'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Txt } from '@/components/atoms';
import { Modal } from '@/components/common';

const LogoutBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const baseClass = 'text-gray-070/50 underline underline-offset-2';
  const positionClass = pathname === '/main' ? 'fixed bottom-30 left-1/2 -translate-x-1/2' : '';

  return (
    <>
      <button
        type='button'
        onClick={() => setIsModalOpen(true)}
        className={`${baseClass} ${positionClass}`}
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
          onClickRightBtn={() => router.push('/auth')}
        >
          로그아웃 하시겠어요?
        </Modal>
      )}
    </>
  );
};

export default LogoutBtn;
