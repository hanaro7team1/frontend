import { Button, Input, Txt } from "@/components/atoms";
import { Header } from "@/components/common";

export default function AdminQuitPage() {
  const commonSize = "w-[320px] h-[50px]";
  const setCenter = "w-[320px] mx-auto flex flex-col gap-[18px]";

  return (
    <>
      <Header className="mb-[50px]" title="회원 탈퇴" />

      <div className= {`${setCenter} mb-[18px]`}>
        <Txt size={24}>비밀번호 확인</Txt>
        <Input placeholder="비밀번호를 입력해 주세요" />
      </div>
        
      <Button title="탈퇴하기" type="submit" color="pink" className={`${commonSize} mx-auto block`}/>
    </>
  );
}
