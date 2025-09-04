import Link from 'next/link';
import { Txt } from '@/components/atoms';
import { Header } from '@/components/common';
import { MypageLinkBox, Profile } from '@/components/domain/admin/mypage';
import { getAdminInfo } from '@/app/apis/mypage';

export default async function AdminMyPage() {
  // 서버에서 호스트 정보 API 호출
  const hostMember = await getAdminInfo();
  const { villageName, phone } = hostMember;

  return (
    <>
      <Header title='내 정보' />
      <Profile villageName={villageName} />
      <div className='mt-9 flex flex-col gap-9 px-6'>
        <MypageLinkBox type='phone' value={phone} href='/admin/mypage/contact' />
        <MypageLinkBox type='password' href='/admin/mypage/pwd' />
      </div>

      <Link
          href='/admin/mypage/quit'
          className='text-gray-070/50 fixed bottom-30 left-1/2 -translate-x-1/2 underline underline-offset-2'
        >
          <Txt size={16} align='center' className='text-gray-070/50'>
            탈퇴하기
          </Txt>
        </Link>
    </>
  );
}
