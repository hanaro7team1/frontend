'use client';

import axios from 'axios';
import { privateApi } from '@/lib/axios-client';
import { getExtFromFile } from '@/utils/stays/stays';

//temp upload 훅입니다 (2단계에서 -> 3단계로 갈 때 s3 임시 폴더에 저장)
async function presignOne(domain: string, file: File) {
  //파일 타입 or 알 수 없음
  const contentType = file.type;
  const extension = getExtFromFile(file) ?? 'bin';

  const { data: presign } = await privateApi.post('/api/admin/upload/presign', {
    domain,
    extension,
    contentType,
  });

  if (!presign?.url || !presign?.key) {
    throw new Error('Presign 응답이 올바르지 않습니다');
  }

  return { presign, contentType };
}

async function putToS3(uploadUrl: string, file: File, contentType: string) {
  const r = await axios.put(uploadUrl, file, {
    headers: { 'Content-Type': contentType },
    // S3는 200/204가 일반적, body 없음
    maxBodyLength: Infinity,
  });
  if (r.status < 200 || r.status >= 300) {
    console.error('upload error');
    throw new Error(`S3 업로드 실패: ${r.status}`);
  }
  return r;
}

export function usePhotoUpload(domain: 'temp' | 'stays') {
  async function uploadAll(items: { id: string; file: File }[]): Promise<string[]> {
    if (!items.length) return [];

    const tasks = items.map(async (it) => {
      const { presign, contentType } = await presignOne(domain, it.file);
      await putToS3(presign.url, it.file, contentType);
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
