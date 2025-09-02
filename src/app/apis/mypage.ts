import { privateApi } from '@/lib/axios-client';
import { serverPrivateApi } from '@/lib/axios-server';

// 시골 관리자 정보 응답 타입
interface AdminInfoResponse {
  villageName: string;
  phone: string;
}

/**
 * 서버 컴포넌트용 - 시골 관리자 정보 조회 API
 */
export const getAdminInfo = async () => {
  const api = await serverPrivateApi();
  const res = await api.get<AdminInfoResponse>('/api/admin/mypage');
  return res.data;
};

/**
 * 클라이언트 컴포넌트용 - 시골 관리자 전화번호 변경 API
 * @param phone - 변경할 전화번호
 */
export const updateAdminPhone = (phone: string) => {
  return privateApi.patch('/api/admin/mypage/phone', { phone });
};

/**
 * 클라이언트 컴포넌트용 - 시골 관리자 비밀번호 변경 API
 * @param currentPassword - 기존 비밀번호
 * @param newPassword - 새 비밀번호
 */
export const updateAdminPassword = (currentPassword: string, newPassword: string) => {
  return privateApi.patch('/api/admin/mypage/password', { currentPassword, newPassword });
};
