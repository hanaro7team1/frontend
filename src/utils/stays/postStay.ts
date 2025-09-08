'use server';

import { revalidatePath } from 'next/cache';
import { serverPrivateApi } from '@/lib/axios-server';
import { StayCreatePayload } from '@/types/admin';
import { StayDetailResponseType } from '@/types/stays';

export async function postStay(payload: StayCreatePayload) {
  const api = await serverPrivateApi();
  const { data } = await api.post<StayDetailResponseType>('/api/admin/stays', payload);
  revalidatePath('/admin/stays');

  return data;
}
