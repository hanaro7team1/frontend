'use client'

import { Button, Input, Txt } from "@/components/atoms";
import { Header, Modal } from "@/components/common";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminQuitPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {setIsModalOpen(true)};

  return (
    <>
      <Header className="mb-[50px]" title="회원 탈퇴" />

      <div  className="p-8 flex flex-col gap-5">
        <Txt size={24}>비밀번호 확인</Txt>
        <Input placeholder="비밀번호를 입력해 주세요" />
        <Button title="탈퇴하기" color="pink" onClick={openModal}/>
      </div>

      {isModalOpen && (
        <Modal grayBtnText="아니요" greenBtnText="네" onClickGrayBtn={() => router.back()} onClickGreenBtn={() => router.push('/auth')}>
          정말 탈퇴하시겠어요?
        </Modal>
      )}
    </>
  );
}
