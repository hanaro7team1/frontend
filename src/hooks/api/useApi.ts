'use client';

import useSWR from 'swr';
import { publicApi } from '@/lib/axios';
import { privateApi } from '@/lib/axios-client';

// SWR fetcher 함수들
export const publicFetcher = (url: string) => publicApi.get(url).then((res) => res.data);
export const privateFetcher = (url: string) => privateApi.get(url).then((res) => res.data);

// 공개 API 훅
export const usePublicData = (endpoint: string) => {
  return useSWR(endpoint, publicFetcher);
};

// 인증 필요한 API 훅
export const usePrivateData = (endpoint: string) => {
  return useSWR(endpoint, privateFetcher);
};
