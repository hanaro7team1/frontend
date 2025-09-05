'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Txt } from '@/components/atoms';
import LogoutBtn from '@/components/common/LogoutBtn';

export const BottomActions = () => {
  const pathname = usePathname();

  return (
    <div className='my-8 w-full px-4'>
      <div className='flex justify-center'>
        {/* 마이페이지에서는 탈퇴하기 */}
        {pathname.startsWith('/admin/mypage') && (
          <Link
            href='/admin/mypage/quit'
            className='text-gray-070/40 text-center underline underline-offset-2 sm:mt-12 mt-20'
          >
            <Txt size={16} className='text-gray-070/40'>
              탈퇴하기
            </Txt>
          </Link>
        )}

        {/* 메인페이지에서는 로그아웃 */}
        {pathname === '/main' && <LogoutBtn />}
      </div>
    </div>
  );
};

export default BottomActions;
