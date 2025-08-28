import { Button, Input, Txt } from "@/components/atoms";
import { Header } from "@/components/common";

export default function AdminQuitPage() {

  return (
    <>
      <Header className="mb-[50px]" title="회원 탈퇴" />

      <div  className="p-8 flex flex-col gap-5">
        <Txt size={24}>비밀번호 확인</Txt>
        <Input placeholder="비밀번호를 입력해 주세요" />
        <Button title="탈퇴하기" type="submit" color="pink" />
      </div>
    </>
  );
}