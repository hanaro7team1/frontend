'use client';

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

    // 401 에러이고, 재시도하지 않았으며, refresh 요청이 아닐 때만 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 별도의 깨끗한 axios 인스턴스로 refresh 요청
        // 기존 인터셉터의 영향을 받지 않도록
        const refreshInstance = axios.create({
          baseURL: BASE_URL,
          withCredentials: true,
        });

        // 서버에 refreshToken 쿠키 포함하여 요청
        await refreshInstance.post('/api/members/refresh');

        // refresh 성공 후 원래 요청 재시도
        return privateApi(originalRequest);
      } catch (refreshError) {
        // refresh 실패 시 로그인 페이지로 리다이렉트
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
