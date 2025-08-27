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


// className = `${}`

  return (
    <>
    
      <Header bgColor="pink" title="내 정보" />
      
      <div>
        {hostMember.villageName} 관리자
      </div>

      <div>
        <ShadowBox>
          <Txt size={24}>{hostMember.phone}</Txt>
          
          <Button title="전화번호 변경" onClick={() => router.push('/admin/mypage/contract')}/>
        </ShadowBox>
      </div>

      <div>
        <ShadowBox >
          <Button title="비밀번호 변경" onClick={() => router.push('/admin/mypage/pwd')}/>
        </ShadowBox>
      </div>

      <Button color="pink" title="뒤로가기" onClick={() => router.push('/admin')}/>

      <button type='button' onClick={() => router.push('/admin')}
        className='underline'>탈퇴하기</button>
    </>
  );
}
