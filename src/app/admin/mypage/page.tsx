'use client'
import { useRouter} from 'next/navigation';
import { Button, ShadowBox, Txt } from "@/components/atoms";
import { Header } from "@/components/common";

export default function AdminMyPage() {
  const router = useRouter();
  const hostMember = {
    villageName: "가람마을",
    phone: "010-1234-1234",
    pwd: "Aaaaaa.1234"
  }

  const Size1 = "block mx-auto w-[348px] h-[152px] ";
  const Size2 = "flex justify-center absolute bottom-5 left-1/2 -translate-x-1/2 w-[330px] h-[50px]";
  const inPosission = "absolute top-[19px] left-[26px] flex items-center justify-center gap-6"

  return (
    <>
      <Header title="내 정보" />
      
      <div className='h-[135px] w-full flex items-center justify-center mb-[35px] bg-[#8484841A]'>
        <div>
          <Txt size={30}>{hostMember.villageName} 관리자</Txt>
        </div>
      </div>

      <div className="flex flex-col gap-9 mb-[150px]">
        <ShadowBox className={`relative ${Size1}`}>
          <div className ={`${inPosission}`}>
            <Txt size={24}>{hostMember.phone}</Txt>
          </div>
          <Button title="전화번호 변경" color = "gray" className = {`${Size2}`} onClick={() => router.push('/admin/mypage/contact')}/>
        </ShadowBox>

        <ShadowBox className={`relative ${Size1}`}>
          <div className ={`${inPosission}`}>
            <Txt size={24}>비밀번호자리</Txt>
          </div>
          <Button title="비밀번호 변경" color = "gray" className = {`${Size2}`} onClick={() => router.push('/admin/mypage/pwd')}/>
        </ShadowBox>    
      </div>
      
        <button type='button' onClick={() => router.push('/admin/mypage/quit')}
          className="mt-[200px] block w-fit mx-auto 
            bg-transparent text-gray-600 underline underline-offset-4 decoration-gray-600 decoration-2">
              탈퇴하기
        </button>
    </>
  );
}
