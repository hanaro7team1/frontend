import { privateApi } from '@/lib/axios-client';

export async function fetchStep5Caption(s3Key: string) {
  const { data } = await privateApi.get('/api/admin/ai/description', {
    params: { s3Key },
  });
  return (typeof data === 'string' ? data : data?.description) ?? '';
}
