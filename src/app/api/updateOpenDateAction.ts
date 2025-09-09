'use server';

import { revalidatePath } from 'next/cache';
import { serverPrivateApi } from '@/lib/axios-server';

export async function updateOpenDatesAction(stayId: number, dates: string[]) {
  const api = await serverPrivateApi();
  const { status } = await api.post(`/api/admin/stays/${stayId}/open-dates`, dates);
  revalidatePath('/admin/stays');

  return status;
}
