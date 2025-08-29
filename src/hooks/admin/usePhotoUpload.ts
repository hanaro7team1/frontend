'use client';

import { getExtFromFile } from '@/utils/stays/stays';
import { PresignResp, UploadedImages } from '@/types/stays';

//temp upload 훅입니다 (2단계에서 -> 3단계로 갈 때 s3 임시 폴더에 저장)
async function presignOne(domain: string, file: File) {
  //파일 타입 or 알 수 없음
  const contentType = file.type;
  const extension = getExtFromFile(file) ?? 'bin';
  const res = await fetch('/api/admin/upload/presign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain, extension, contentType }),
  });

  //TODO: 모달로 처리 (사진 업로드 실패, 다시 시도해 주세요)
  if (!res.ok) throw new Error('presign URL 발급 실패');

  const presign = (await res.json()) as PresignResp;

  return { presign, contentType };
}

//TODO: 모달로 처리
async function putToS3(uploadUrl: string, file: File, contentType: string) {
  const r = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': contentType },
    body: file,
  });
  if (!r.ok) throw new Error('S3 업로드 실패 ');
}

export function usePhotoUpload(domain: 'temp' | 'stays') {
  async function uploadAll(items: { id: string; file: File }[]): Promise<UploadedImages[]> {
    if (!items.length) return [];

    const results = await Promise.all(
      items.map(async (it) => {
        const { presign, contentType } = await presignOne(domain, it.file);
        await putToS3(presign.url, it.file, contentType);
        return {
          id: it.id,
          key: presign.key,
          url: '',
          contentType,
        };
      }),
    );
    return results;
  }
  return { uploadAll };
}
