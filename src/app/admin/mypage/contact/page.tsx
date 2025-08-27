'use client'
import { Button, Input, Txt } from "@/components/atoms";
import { Header } from "@/components/common";
import { useRouter } from "next/navigation";

export default function AdminContactPage() {
const router = useRouter();
  const hostMember = {
    phone: "010-1234-1234"
  }
  const commonSize = "w-[320px] h-[50px]";

  return (
    <div>
      <Header className="mb-[50px]" title="전화번호 변경"/>
      
      <div >
        <Txt size={24}>기존 전화번호</Txt>
        <Txt size={24}>{hostMember.phone}</Txt>
      </div>

      <div className={`${commonSize}`}>
        <Txt size={24}>변경할 전화번호</Txt>
        <Input placeholder="변경할 전화번호를 입력하세요"/>
      </div>

      <div>
        <Button title="변경하기"  type="submit" color="pink" className={`${commonSize}`}/>
      </div>
    
    </div>
  );
}
