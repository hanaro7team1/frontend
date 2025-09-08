import axios from 'axios';
import { publicApi } from './axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 인증 필요한 API
// 클라이언트컴포넌트용
export const privateApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 브라우저가 쿠키를 자동 전송
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 interceptor
privateApi.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// 응답 interceptor: 401 시 서버에 refresh 요청 후 재시도
privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 서버에 refreshToken 쿠키 포함하여 요청
        await privateApi.post('/api/members/refresh');

        // 재요청
        return privateApi(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// 로그인 API (쿠키 기반)
export const authApi = {
  login: async (loginData: { loginId: string; password: string }) => {
    // publicApi 호출, 서버가 HttpOnly 쿠키에 access/refresh 토큰 저장
    const { data: userData } = await publicApi.post('/api/members/signin', loginData, {
      withCredentials: true, // 쿠키 받기
    });

    // 토큰은 httpOnly 쿠키로 자동 저장됨
    // 사용자 정보만 localStorage에 저장
    const { loginId, role, name, memberId } = userData;
    localStorage.setItem(
      'user',
      JSON.stringify({
        loginId,
        role,
        name,
        memberId,
      }),
    );

    return userData;
  },

  logout: async () => {
    await publicApi.post(
      '/api/members/signout',
      {},
      {
        withCredentials: true, // 쿠키 삭제
      },
    );
    localStorage.removeItem('user');
  },
};