import { Button, Input, Txt } from "@/components/atoms";
import { Header } from "@/components/common";

export default function AdminQuitPage() {


  return (
    <div>
      <Header title="회원 탈퇴" />

      

      <div className="ml-12">
        <Txt size={24}>비밀번호 확인</Txt>
        <Input placeholder="비밀번호를 입력해 주세요" />
      </div>

      <Button title="탈퇴하기" type="submit" color="pink" className="ml-12"/>
    </div>
  );
}
