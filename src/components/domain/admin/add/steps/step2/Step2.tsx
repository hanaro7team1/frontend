'use client';

import { useEffect, useRef, useState } from 'react';
import { Txt } from '@/components/atoms';
import { useToast } from '@/components/common/ToastContext';
import { usePhotoPreview } from '@/hooks/admin/usePhotoPreview';
import { usePhotoUpload } from '@/hooks/admin/usePhotoUpload';
import { SLOT_COUNT } from '@/constants/admin/Admin';
import { useWizardData } from '../../wizard/WizardDataProvider';
import { useWizard } from '../../wizard/WizardProvider';
import HiddenFileInput from './HiddenFileInput';
import ImageUploadLoading from './ImageUploadLoading';
import PhotoGrid from './PhotoGrid';
import UploadBarButton from './UploadBarButton';

export default function AddPhoto() {
  const { currentStep, registerBeforeNext, setNextDisabled } = useWizard();

  const { data, dispatch } = useWizardData();

  const { items, urls, inputRef, openPicker, onInputChange, removeAt } =
    usePhotoPreview(SLOT_COUNT);

  const { uploadAll } = usePhotoUpload('temp');

  // 중복 업로드/재진입 방지
  const uploadingRef = useRef(false);

  // 이미 업로드 성공했는지
  const uploadedOnceRef = useRef(false);

  //로딩 화면
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    const hasLocal = (items?.length ?? 0) > 0; //이번 스텝 파일
    const hasSaved = (data.step2?.s3Keys?.length ?? 0) > 0; //전역에 이미 저장된 키
    const uploading = uploadingRef.current; //사진 업로드 중인지

    //파일이 없고, 저장된 키가 없거나 업로드 중이거나
    setNextDisabled(currentStep, (!hasLocal && !hasSaved) || uploading);

    const cleanup = registerBeforeNext(currentStep, async () => {
      if (!items.length) {
        showToast('사진을 한 장 이상 올려주세요', 'warning');
        return false;
      }
      // 이미 한 번 업로드에 성공해서 키 보관해둔 상태라면 통과
      if (uploadedOnceRef.current) return true;

      // 업로드 중이면 중복 실행 막기
      if (uploadingRef.current) return false;

      try {
        uploadingRef.current = true;
        setLoading(true); // 업로드 중에는 로딩창
        setNextDisabled(currentStep, true); // 업로드 중 잠금

        const uploaded = await uploadAll(items);

        const prev = Array.isArray(data?.step2?.s3Keys) ? data.step2.s3Keys : [];

        const merged = Array.from(new Set([...prev, ...uploaded]));

        dispatch({ type: 'SET_STEP2', payload: { s3Keys: merged } });

        uploadedOnceRef.current = true;

        return true;
      } catch (err) {
        showToast('업로드 중 오류가 발생했습니다 \n 잠시 후 다시 시도해 주세요', 'error');
        return false;
      } finally {
        uploadingRef.current = false;
        setNextDisabled(currentStep, false); // disabled 해제
      }
    });

    return cleanup;
  }, [items, uploadAll, registerBeforeNext, setNextDisabled]);

  return (
    <>
      <Txt>사랑방의 내부 외부 사진을 첨부해 주세요</Txt>
      {/* inputRef로 제어, 빈 그리드나 하단 버튼을 누를 시 openPicker 열리는 구조 (input은 하나고 여러 버튼이 접근 가능함)  */}
      <HiddenFileInput inputRef={inputRef} onChange={onInputChange} capture='environment' />
      {/* 현재까지 선택된 사진 그리드 형식으로 보여줌 없을 시 사진 업로드 그리드  */}
      <PhotoGrid urls={urls} onPick={openPicker} onRemoveAt={removeAt} />
      {/* 사진 업로드용 버튼, 그리드와 같은 동작을 함  */}
      <UploadBarButton onClick={openPicker} />
      {loading && <ImageUploadLoading />}
    </>
  );
}
