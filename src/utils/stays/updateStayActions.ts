'use server';

import { revalidatePath } from 'next/cache';
import { serverPrivateApi } from '@/lib/axios-server';
import { StayPatchRequest, StayPatchResponse } from '@/types/stays';

export async function updateStayAction(id: number, payload: StayPatchRequest) {
  // 스프링 백엔드에 PATCH
  const api = await serverPrivateApi();
  try {
    await api.patch<StayPatchResponse>(`api/admin/stays/${id}`, payload);
  } catch {
    throw new Error('수정 중 오류 발생');
  }
  // 상세(돌아갈 페이지) 무효화
  revalidatePath(`/admin/stays/${id}`, 'page');
}
