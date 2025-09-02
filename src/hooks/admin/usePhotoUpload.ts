'use client';

import { getExtFromFile } from '@/utils/stays/stays';
import { PresignResp } from '@/types/stays';

//temp upload 훅입니다 (2단계에서 -> 3단계로 갈 때 s3 임시 폴더에 저장)
async function presignOne(domain: string, file: File) {
  //파일 타입 or 알 수 없음
  const contentType = file.type;
  const extension = getExtFromFile(file) ?? 'bin';

  const res = await fetch('/api/admin/upload/presign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ domain, extension, contentType }),
  });

  //TODO: 모달로 처리 (사진 업로드 실패, 다시 시도해 주세요)
  if (!res.ok) throw new Error('presign URL 발급 실패');

  const presign = (await res.json()) as PresignResp;

  return { presign, contentType };
}

//TODO: 모달로 처리
async function putToS3(uploadUrl: string, file: File, contentType: string) {
  console.log('[S3 PUT try]', uploadUrl); // ✅ 반드시 절대 URL 찍기
  const r = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': contentType },
    body: file,
  });
  if (!r.ok) throw new Error('S3 업로드 실패 ');
  return r;
}

export function usePhotoUpload(domain: 'temp' | 'stays') {
  async function uploadAll(items: { id: string; file: File }[]): Promise<string[]> {
    if (!items.length) return [];

    const tasks = items.map(async (it) => {
      const { presign, contentType } = await presignOne(domain, it.file);
      const res = await putToS3(presign.url, it.file, contentType);
      // putToS3가 Response를 반환하지 않으면 여기서 검사 불가 → 아래 “2)” 참고
      if (res && !res.ok) throw new Error(`PUT failed: ${res.status}`);
      return presign.key; // 성공 시 key만 반환
    });
    const settled = await Promise.allSettled(tasks);
    const keys = settled
      .filter((r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled')
      .map((r) => r.value);

    return keys; // ← 성공한 key들만
  }
  return { uploadAll };
}
