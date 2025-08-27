'use client';

import { Camera as CameraIcon } from 'lucide-react';
import { Txt } from '@/components/atoms';

export default function UploadBarButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type='button'
      onClick={onClick}
      title='사진찍기/앨범에서 올리기'
      className='text-black-626 border-gray-6d6 flex justify-center gap-3 rounded-[10px] border bg-white p-3'
    >
      <CameraIcon size={30} color='var(--code-theme5)' />
      <Txt>사진 찍기/앨범에서 올리기</Txt>
    </button>
  );
}
