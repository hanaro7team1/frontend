import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 공개 API (토큰 불필요)
// 서버컴포넌트, 클라이언트 컴포넌트 모두 사용 가능
export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
