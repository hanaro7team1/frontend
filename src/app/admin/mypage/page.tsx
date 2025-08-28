'use client'
import { useRouter} from 'next/navigation';
import { Txt } from "@/components/atoms";
import { Header } from "@/components/common";
import Image from 'next/image';
import ChangeBox from '@/components/domain/admin/mypage/ChangeBox';

export default function AdminMyPage() {
  const router = useRouter();
  const hostMember = {
    villageName: "가람마을",
    phone: "010-1234-1234",
  }

  return (
    <>
      <Header title="내 정보" />
      <div className='bg-gray-484/10 p-11 flex gap-7 items-center justify-center'>
          <div className="w-[70px] h-[70px] rounded-full bg-[#00A49D] grid place-items-center">
            <Image src='/images/Img_Mypage_Profile.svg' alt='프로파일' width={50} height={50} className="object-contain"/>
          </div>
          <Txt size={30}>{hostMember.villageName} 관리자</Txt>
      </div>

      <div className='flex flex-col p-8 gap-9'>
          <ChangeBox buttonTxt={'전화번호 변경'} phoneNum={hostMember.phone}></ChangeBox>
          <ChangeBox buttonTxt={'비밀번호 변경'} ></ChangeBox>
      </div>

        <button type="button" onClick={() => router.push('/admin/mypage/quit')}
          className="font-[Hana2-CM] mt-[150px] block w-fit mx-auto bg-transparent
                      underline underline-offset-4 text-[#26262673] decoration-[#26262673]">
          탈퇴하기
        </button>
    </>
  );
}
