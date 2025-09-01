'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 인증 필요한 API
// 서버컴포넌트용
export async function serverPrivateApi() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Cookie: cookieHeader, // 서버에서 직접 쿠키 전달
    },
  });

  return instance;
}
