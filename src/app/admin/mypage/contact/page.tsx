'use client'
import { Button, Input, Txt } from "@/components/atoms";
import { Header } from "@/components/common";
import { useState } from "react";
import Image from "next/image";
import NoticeModal from "@/components/domain/admin/mypage/NoticeModal";

export default function AdminContactPage() {
  // db
  const hostPhone = "010-1234-1234";

  const [phone, setPhone] = useState(hostPhone);
  const [newPhone, setNewPhone] = useState("");
  const [openNotice, setOpenNotice] = useState(false);

  const editPhone = () => {
    setPhone(newPhone.trim());
    setOpenNotice(true);
  };

  const phoneHyphen = (h: string) => {
    const digits = h.replace(/\D/g, '');

    if (digits.length < 4) return digits;
    if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    if (digits.length === 10) return `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6,10)}`;

    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  };

  return (
    <>
      <Header title="전화번호 변경"/>
      
      <div className="p-8 flex flex-col gap-4">
        <Txt size={24} className="text-gray-070">기존 전화번호</Txt>
        <div className="flex items-center gap-3">
          <Image src='/icons/Ic_Phone_big.svg' alt="수화기" width={35} height={35}/>
          <Txt size={24}>{phone}</Txt>
        </div>
      
        <div className="flex flex-col gap-4 mt-[30px]">
          <Txt size={24} className="text-gray-070">변경할 전화번호</Txt>
          <Input value={phoneHyphen(newPhone)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPhone(e.target.value)}
            placeholder="변경할 전화번호를 입력하세요"/>
        </div>
        
        <Button title="변경하기" color="pink" onClick={editPhone}/>
      </div>

      <NoticeModal open={openNotice} text="전화번호" />
    </>
  );
}

