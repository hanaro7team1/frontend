'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const MY_LOCAL_URL = process.env.NEXT_PUBLIC_SITE_URL;

/**
 * 서버 컴포넌트에서 사용하는 인증이 필요한 API 요청을 위한 axios 인스턴스를 생성합니다.
 * 401 에러 발생 시 자동으로 토큰을 갱신하고 이전 요청을 재시도합니다.
 */
export async function serverPrivateApi() {
  'use server';

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Cookie: cookieHeader,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // 내 로컬 route handler 호출
          const refreshRes = await fetch(`${MY_LOCAL_URL}/api/auth/refresh`, {
            method: 'POST',
            headers: {
              Cookie: originalRequest.headers.Cookie, // 기존 쿠키 직접 전달
            },
          });

          if (!refreshRes.ok) {
            const errorBody = await refreshRes.text();
            throw new Error(`Refresh failed with status ${refreshRes.status}: ${errorBody}`);
          }

          // 1. refresh 응답에서 새로운 'set-cookie' 헤더들을 모두 추출
          const newSetCookieValues = refreshRes.headers.getSetCookie();

          if (newSetCookieValues && newSetCookieValues.length > 0) {
            // 2. 'key=value' 부분만 추출하여 새로운 'Cookie' 헤더 문자열로
            //    예: 'accessToken=...; Path=...' -> 'accessToken=...'
            const cookiePairs = newSetCookieValues.map(
              (cookieString) => cookieString.split(';')[0],
            );
            const newCookieHeader = cookiePairs.join('; ');

            // 3. 현재 axios 인스턴스와 재시도할 요청에 새로운 쿠키를 설정
            instance.defaults.headers.Cookie = newCookieHeader;
            originalRequest.headers.Cookie = newCookieHeader;

            return instance(originalRequest);
          } else {
            throw new Error('[AUTH] Refresh endpoint did not return a "set-cookie" header.');
          }
        } catch (refreshError) {
          console.error('[AUTH] refresh 실패', refreshError);
          return Promise.reject(refreshError);
        }
      } else if (originalRequest._retry) {
        // 이미 재시도한 요청이 또 실패한 경우
        console.error(
          `[AUTH] The retried request to ${originalRequest.url} also failed. Not retrying again.`,
        );
      }

      // 그 외의 에러는 그대로 반환합니다.
      return Promise.reject(error);
    },
  );

  return instance;
}
