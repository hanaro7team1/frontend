import { Button, Input, Txt } from "@/components/atoms";
import { Header } from "@/components/common";

export default function AdminPwdPage() {
  const commonSize = "w-[320px] h-[50px]";
  const setCenter = "w-[320px] mx-auto flex flex-col gap-[18px]";

  const classN: string = "test";

  return (
    <>
      <Header className="mb-[50px]" title="비밀번호 변경" />
    
      <div className="flex flex-col gap-9">
        <div className= {`${setCenter}`}>
          <Txt size={24}>기존 비밀번호</Txt>
          <Input placeholder="기존 비밀번호를 입력해 주세요" />
        </div>

        <div className= {`${setCenter}`}>
          <Txt size={24}>변경할 비밀번호</Txt>
          <Input placeholder="영문자,숫자,특수문자를 포함한 8자 이상" />
        </div>

        <div className= {`${setCenter}`}>
          <Txt size={24}>변경할 비밀번호 확인</Txt>
          <Input placeholder="변경할 비밀번호를 한번 더 입력하세요" />
        </div>

        <Button title="변경하기" type="submit" color="pink" className={`${commonSize} mx-auto block`}/>
      </div>
    </>
  );
}
