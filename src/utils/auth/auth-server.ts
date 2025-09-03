'use server';

import { cookies } from 'next/headers';

/**
 * 관리자 여부를 쿠키에서 가져오는 함수. 서버 컴포넌트 전용
 * @returns {boolean} isAdmin
 */
export const getIsAdmin = async () => {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('role')?.value === 'ROLE_ADMIN';
  return isAdmin;
};
