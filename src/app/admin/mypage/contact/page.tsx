'use client'
import { Button, Input, Txt } from "@/components/atoms";
import { Header } from "@/components/common";
import { useState } from "react";
import NoticeModal from "../NoticeModal";
import Image from "next/image";

export default function AdminContactPage() {
  // db
  const hostMember = {
    phone: "010-1234-1234"
  }
  const [phone, setPhone] = useState(hostMember.phone);
  const [newPhone, setNewPhone] = useState("");
  const [openNotice, setOpenNotice] = useState(false);

  const editPhone = () => {
    setPhone(newPhone.trim());
    setOpenNotice(true);
  };

  const commonSize = "w-[320px] h-[50px]";
  const setCenter = "w-[320px] mx-auto flex flex-col gap-[18px]";

  return (
    <div>
      <Header className="mb-[50px]" title="전화번호 변경"/>
      
      <div className="flex flex-col gap-9">
        <div className= {`${setCenter}`}>
          <Txt size={24}>기존 전화번호</Txt>
          <div className="flex items-center gap-[5px]">
            <Image src='/icons/Ic_Phone_big.svg' alt="수화기" width={35} height={35}/>
            <Txt size={24}>{phone}</Txt>
          </div>
        </div>

        <div className= {`${setCenter} mb-[20px]`}>
          <Txt size={24}>변경할 전화번호</Txt>
          <Input value={newPhone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPhone(e.target.value)}
            placeholder="변경할 전화번호를 입력하세요" className={`${commonSize}`}/>
        </div>

        <Button title="변경하기" color="pink" className={`${commonSize} mx-auto block`} onClick={editPhone}/>
      </div>

      <NoticeModal open={openNotice} text="전화번호" />
    </div>
  );
}
