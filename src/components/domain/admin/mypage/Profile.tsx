'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import { Txt } from '@/components/atoms';
import { Modal } from '@/components/common';

type Props = {
  villageName: string;
};

const Profile = ({ villageName }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className='bg-gray-484/10 border-b-black-626/15 flex items-center justify-center gap-7 border p-8'>
        <div className='bg-green-49d relative grid h-[70px] w-[70px] place-items-center rounded-full'>
          <Image
            src='/images/Img_Mypage_Profile.svg'
            alt='프로필'
            width={62}
            height={62}
            className='object-contain pb-3 pl-1'
          />
        </div>
        <section className='flex flex-col items-start'>
          <Txt size={30}>{villageName} 관리자</Txt>
          <button
            type='button'
            onClick={() => setIsModalOpen(true)}
            className='text-gray-500 underline underline-offset-2'
          >
            로그아웃
          </button>
        </section>
      </div>
      {isModalOpen && (
        <Modal
          grayBtnText='아니요'
          greenBtnText='네'
          onClickGrayBtn={() => setIsModalOpen(false)}
          onClickGreenBtn={() => router.push('/auth')}
        >
          로그아웃 하시겠어요?
        </Modal>
      )}
    </>
  );
};

export default Profile;
