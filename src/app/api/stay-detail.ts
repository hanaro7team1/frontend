import { notFound } from 'next/navigation';
import { StayDetailResponseType } from '@/types/stays';

/**
 * 특정 사랑방의 상세 정보를 조회하는 API 함수
 * @param stayId 사랑방 ID
 */
export async function getStay(stayId: string): Promise<StayDetailResponseType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stays/${stayId}`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
}
