import { Input, Txt } from "@/components/atoms";
import { Header } from "@/components/common";

export default function AdminContactPage() {
  const phoneNumber:string = "";

  return (
    <div>
      <Header bgColor="pink" title="전화번호 변경" />
      
      <div>
        <Txt size={24}>기존 전화번호</Txt>
        <Txt size={24}>{phoneNumber}</Txt>
      </div>

      <div>
        <Txt size={24}>변경할 전화번호</Txt>
        <Input placeholder="변경할 전화번호를 입력하세요"/>
      </div>
      
    </div>
  );
}
