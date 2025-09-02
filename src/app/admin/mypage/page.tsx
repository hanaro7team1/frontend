import Link from 'next/link';
import { Header } from '@/components/common';
import { ChangeBox, Profile } from '@/components/domain/admin/mypage';

export default function AdminMyPage() {
  const hostMember = {
    villageName: '00마을',
    phone: '010-1234-5678',
  };
  const { villageName, phone } = hostMember;

  return (
    <>
      <Header title='내 정보' />
      <Profile villageName={villageName} />
      <div className='mt-9 flex flex-col gap-9 px-6'>
        <ChangeBox buttonTxt='전화번호 변경' phoneNum={phone} />
        <ChangeBox buttonTxt='비밀번호 변경' />
      </div>

      <Link
        href='/admin/mypage/quit'
        className='fixed bottom-12 left-1/2 -translate-x-1/2 text-gray-500 underline underline-offset-2'
      >
        탈퇴하기
      </Link>
    </>
  );
}
