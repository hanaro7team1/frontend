import { Button, Input, Txt } from "@/components/atoms";
import { Header } from "@/components/common";

export default function AdminPwdPage() {
  const classN: string = "test";

  return (
    <>
      <Header bgColor="pink" title="비밀번호 변경" />
    
    <div className = "ml-12">
      <div>
        <Txt size={24}>기존 비밀번호</Txt>
        <Input placeholder="기존 비밀번호를 입력해 주세요" />
      </div>

      <div>
        <Txt size={24}>변경할 비밀번호</Txt>
        <Input placeholder="영문자,숫자,특수문자를 포함한 8자 이상" />
      </div>

      <div>
        <Txt size={24}>변경할 비밀번호 확인</Txt>
        <Input placeholder="변경할 비밀번호를 한번 더 입력하세요" />
      </div>

      <Button title="변경하기" type="submit" color="pink"/>
      </div>
    </>
  );
}
