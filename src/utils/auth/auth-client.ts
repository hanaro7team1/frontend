'use client';

/**
 * 관리자 여부를 localStorage에서 가져오는 함수. 클라이언트 컴포넌트 전용
 * @returns {boolean} isAdmin
 */
export function getIsAdminFromLocalStorage() {
  if (typeof window === 'undefined') return false; // 서버 컴포넌트에서의 사용 방지

  const role = localStorage.getItem('role');
  const isAdmin = role === 'ROLE_ADMIN';
  return isAdmin;
}
