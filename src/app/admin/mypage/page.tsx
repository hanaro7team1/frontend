'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Txt } from '@/components/atoms';
import { Header, Modal } from '@/components/common';
import ChangeBox from '@/components/domain/admin/mypage/ChangeBox';

export default function AdminMyPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hostMember = {
    villageName: '00마을',
    phone: '010-1234-5678',
  };
  const { villageName, phone } = hostMember;

  return (
    <>
      <Header title="내 정보" />

      <div className="bg-gray-484/10 border-b-black-626/15 flex items-center justify-center gap-7 border p-8">
        <div className="bg-green-49d relative grid h-[70px] w-[70px] place-items-center rounded-full">
          <Image
            src="/images/Img_Mypage_Profile.svg"
            alt="프로필"
            width={62}
            height={62}
            className="object-contain pb-3 pl-1"
          />
        </div>
        <section className="flex flex-col items-start">
          <Txt size={30}>{villageName} 관리자</Txt>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-gray-500 underline underline-offset-2"
          >
            로그아웃
          </button>
        </section>
      </div>

      <div className="mt-9 flex flex-col gap-9 px-6">
        <ChangeBox buttonTxt="전화번호 변경" phoneNum={phone} />
        <ChangeBox buttonTxt="비밀번호 변경" />
      </div>

      <Link
        href="/admin/mypage/quit"
        className="fixed bottom-12 left-1/2 -translate-x-1/2 text-gray-500 underline underline-offset-2"
      >
        탈퇴하기
      </Link>

      {isModalOpen && (
        <Modal
          grayBtnText="아니요"
          greenBtnText="네"
          onClickGrayBtn={() => setIsModalOpen(false)}
          onClickGreenBtn={() => router.push('/auth')}
        >
          로그아웃 하시겠어요?
        </Modal>
      )}
    </>
  );
}
