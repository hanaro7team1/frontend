import { CameraIcon } from 'lucide-react';
import { Txt } from '@/components/atoms';
import { SLOT_COUNT } from '@/constants/admin/add/AddPhoto';
import PhotoUploadComponent from './PhotoUploadComponent';

export default function AddPhoto() {
  return (
    <>
      <Txt align='left'>사랑방 내부/외부 사진을 첨부해 주세요</Txt>
      <div className='border-gray-6d6 grid grid-cols-3 grid-rows-2 gap-2 rounded-[10px] border p-2'>
        {Array.from({ length: SLOT_COUNT }).map((_, idx) => (
          <div key={idx} className='aspect-square'>
            <PhotoUploadComponent />
          </div>
        ))}
      </div>
      <button
        title='사진찍기/앨범에서 올리기'
        className='border-gray-6d6 text-black-626 flex justify-center gap-3 rounded-[10px] border bg-white p-3'
      >
        <CameraIcon size={30} color='var(--code-theme5)' />
        <Txt>사진 찍기/앨범에서 올리기</Txt>
      </button>
    </>
  );
}
