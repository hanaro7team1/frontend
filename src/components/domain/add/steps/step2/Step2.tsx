'use client';

import { Txt } from '@/components/atoms';
import { usePhotoUpload } from '@/hooks/admin/usePhotoUpload';
import { SLOT_COUNT } from '@/constants/admin/add/AddPhoto';
import HiddenFileInput from './HiddenFileInput';
import PhotoGrid from './PhotoGrid';
import UploadBarButton from './UploadBarButton';

export default function AddPhoto() {
  const { urls, inputRef, openPicker, onInputChange, removeAt } = usePhotoUpload(SLOT_COUNT);

  return (
    <>
      <Txt align='left'>사랑방의 내부 외부 사진을 첨부해 주세요</Txt>
      {/* inputRef로 제어, 빈 그리드나 하단 버튼을 누를 시 openPicker 열리는 구조 (input은 하나고 여러 버튼이 접근 가능함)  */}
      <HiddenFileInput inputRef={inputRef} onChange={onInputChange} capture='environment' />
      {/* 현재까지 선택된 사진 그리드 형식으로 보여줌 없을 시 사진 업로드 그리드  */}
      <PhotoGrid urls={urls} onPick={openPicker} onRemoveAt={removeAt} />
      {/* 사진 업로드용 버튼, 그리드와 같은 동작을 함  */}
      <UploadBarButton onClick={openPicker} />
    </>
  );
}
