'use client';

import useSWR, { SWRResponse } from 'swr';
import { publicApi } from '@/lib/axios';
import { privateApi } from '@/lib/axios-client';

// SWR fetcher 함수들
export const publicFetcher = (url: string) => publicApi.get(url).then((res) => res.data);
export const privateFetcher = (url: string) => privateApi.get(url).then((res) => res.data);

// 공개 API 훅
export const usePublicData = <T = any>(endpoint: string): SWRResponse<T, any> => {
  return useSWR<T>(endpoint, publicFetcher);
};

// 인증 필요한 API 훅
export const usePrivateData = <T = any>(endpoint: string): SWRResponse<T, any> => {
  return useSWR<T>(endpoint, privateFetcher);
};
