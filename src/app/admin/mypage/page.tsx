'use client'
import { useRouter} from 'next/navigation';
import { Button, ShadowBox, Txt } from "@/components/atoms";
import { Header } from "@/components/common";
import Image from 'next/image';

export default function AdminMyPage() {
  const router = useRouter();
  const hostMember = {
    villageName: "가람마을",
    phone: "010-1234-1234",
    pwd: "Aaaaaa.1234"
  }

  const boxSet = "block mx-auto w-[348px] h-[152px] ";
  const buttonSet = "flex justify-center absolute bottom-5 left-1/2 -translate-x-1/2 w-[330px] h-[50px]";
  const inPosission = "absolute top-[19px] left-[26px] flex items-center justify-center gap-6"

  return (
    <>
      <Header title="내 정보" />
      
      <div className='h-[135px] w-full flex items-center justify-center mb-[35px] bg-[#8484841A] gap-7'>
        <div className="w-[70px] h-[70px] rounded-full bg-[#00A49D] grid place-items-center">
          <Image src='/images/Img_Mypage_Profile.svg' alt='프로파일' width={50} height={50} className="object-contain"/>
        </div>
        <Txt size={30}>{hostMember.villageName} 관리자</Txt>
      </div>

      <div className="flex flex-col gap-9 mb-[150px]">
        <ShadowBox className={`relative ${boxSet}`}>
          <div className ={`${inPosission}`}>
            <Image src='/icons/Ic_Phone_circle_fill.svg' alt='전화기로고' width={50} height={50}/>
            <Txt size={24}>{hostMember.phone}</Txt>
          </div>
          <Button title="전화번호 변경" color = "gray" className = {`${buttonSet}`} onClick={() => router.push('/admin/mypage/contact')}/>
        </ShadowBox>

        <ShadowBox className={`relative ${boxSet}`}>
          <div className ={`${inPosission}`}>
            <Image src='/icons/Ic_Lock_circle_fill.svg' alt='자물쇠로고' width={50} height={50}/>
            <Txt size={24}>{"*".repeat(hostMember.pwd.length)}</Txt>
          </div>
          <Button title="비밀번호 변경" color = "gray" className = {`${buttonSet}`} onClick={() => router.push('/admin/mypage/pwd')}/>
        </ShadowBox>    
      </div>

        <button type="button" onClick={() => router.push('/admin/mypage/quit')}
          className="font-[Hana2-CM] mt-[200px] block w-fit mx-auto bg-transparent
                      underline underline-offset-4 text-[#26262673] decoration-[#26262673]">
          탈퇴하기
        </button>
    </>
  );
}
