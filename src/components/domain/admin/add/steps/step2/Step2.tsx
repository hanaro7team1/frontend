'use client';

import { tree } from 'next/dist/build/templates/app-page';
import { useEffect, useRef } from 'react';
import { Txt } from '@/components/atoms';
import { usePhotoPreview } from '@/hooks/admin/usePhotoPreview';
import { usePhotoUpload } from '@/hooks/admin/usePhotoUpload';
import { SLOT_COUNT } from '@/constants/admin/Admin';
import { useWizardData } from '../../wizard/WizardDataProvider';
import { useWizard } from '../../wizard/WizardProvider';
import HiddenFileInput from './HiddenFileInput';
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

  const uploadedOnceRef = useRef(false); // 이미 업로드 성공했는지

  useEffect(() => {
    const hasLocal = (items?.length ?? 0) > 0; //이번 스텝 파일
    const hasSaved = (data.step2?.s3Keys?.length ?? 0) > 0; //전역에 이미 저장된 키
    const uploading = uploadingRef.current; //사진 업로드 중인지

    //파일이 없고, 저장된 키가 없거나 업로드 중이거나
    setNextDisabled(currentStep, (!hasLocal && !hasSaved) || uploading);

    const cleanup = registerBeforeNext(currentStep, async () => {
      if (!items.length) {
        alert('사진을 최소 1장 이상 올려 주세요');
        return false;
      }
      // 이미 한 번 업로드에 성공해서 키 보관해둔 상태라면 통과
      if (uploadedOnceRef.current) return true;

      // 업로드 중이면 중복 실행 막기
      if (uploadingRef.current) return false;

      try {
        uploadingRef.current = true;
        setNextDisabled(currentStep, true); // 업로드 중 잠금

        const uploaded = await uploadAll(items);

        if (uploaded.length === 0) {
          alert('업로드 된 것이 없으므로 사진 업로드 실패');
          return false;
        }
        const prev = Array.isArray(data?.step2?.s3Keys) ? data.step2.s3Keys : [];

        const merged = Array.from(new Set([...prev, ...uploaded]));
        console.log('>>> 병합된 keys:', merged);

        dispatch({ type: 'SET_STEP2', payload: { s3Keys: merged } });

        uploadedOnceRef.current = true;

        return true;
      } catch (e) {
        console.log('사진 업로드 에러 ' + e);
        alert('사진 업로드 중 문제 발생');
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
    </>
  );
}
