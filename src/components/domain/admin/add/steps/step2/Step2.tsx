'use client';

import { Item } from '@radix-ui/react-accordion';
import { INSPECT_MAX_BYTES } from 'buffer';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Txt } from '@/components/atoms';
import { useToast } from '@/components/common/ToastContext';
import { useWizard } from '@/components/domain/admin/add/wizard/WizardProvider';
import { usePhotoPreview } from '@/hooks/admin/usePhotoPreview';
import { usePhotoUpload } from '@/hooks/admin/usePhotoUpload';
import { SLOT_COUNT } from '@/constants/admin/Admin';
import HiddenFileInput from './HiddenFileInput';
import ImageUploadLoading from './ImageUploadLoading';
// ⬇️ 기존 PhotoGrid가 urls만 받는 인터페이스라면 그대로 사용
import PhotoGrid from './PhotoGrid';
import UploadBarButton from './UploadBarButton';
import UplaodInfo from './UploadInfo';

export default function AddPhoto() {
  const { currentStep, registerBeforeNext, setNextDisabled } = useWizard();
  const { showToast } = useToast();
  const { uploadAll } = usePhotoUpload('temp');

  // ✅ 훅에서 상태·행동 전부 가져옴 (items 하나로 통합)
  const {
    items, // 대기(파일 있고 s3Key 없음) 먼저 보이는 뷰. 원본 순서 쓰려면 items 사용
    inputRef,
    openPicker,
    onInputChange, // 파일 추가 → STEP2_ADD_FILES
    removeById, // 삭제 → STEP2_REMOVE_ITEM (+revoke)
    getDisplayUrl,
    pending, // 업로드 대기열 (file && !s3Key)
    commitKeys, // 업로드 결과 반영 → STEP2_COMMIT_KEYS
  } = usePhotoPreview(SLOT_COUNT);

  // 단일 그리드 렌더용 URL (blob 우선 → s3Key URL)
  const urls = useMemo(
    () => items.map(getDisplayUrl).filter((u): u is string => !!u),
    [items, getDisplayUrl],
  );

  const uploadingRef = useRef(false);
  const [loading, setLoading] = useState(false);

  const hasTemp = pending.length > 0;
  const hasCommitted = items.some((x) => !!x.s3Key);
  const hasAnything = hasTemp || hasCommitted;

  useEffect(() => {
    setNextDisabled(currentStep, uploadingRef.current || !hasAnything);

    const cleanup = registerBeforeNext(currentStep, async () => {
      // 커밋만 있고 임시 없음 → 통과
      if (!hasTemp && hasCommitted) return true;

      // 아무것도 없음
      if (!hasAnything) {
        showToast('사진을 한 장 이상 올려주세요', 'warning');
        return false;
      }

      try {
        uploadingRef.current = true;
        setLoading(true);
        setNextDisabled(currentStep, true);

        // 대기열만 업로드 (id 포함)
        const payload = pending.map((it) => ({ id: it.id, file: it.file! }));
        const result = (await uploadAll(payload)) as { id: string; s3Key: string }[] | string[];

        let pairs: { id: string; s3Key: string }[] = [];
        if (Array.isArray(result) && result.length > 0 && typeof result[0] === 'object') {
          pairs = result as { id: string; s3Key: string }[];
        } else if (Array.isArray(result)) {
          const keys = result as string[];
          const useLen = Math.min(keys.length, pending.length);
          pairs = Array.from({ length: useLen }, (_, i) => ({
            id: pending[i].id,
            s3Key: keys[i],
          }));
        }

        if (!pairs.length) {
          showToast('업로드 결과를 확인할 수 없습니다. 다시 시도해 주세요.', 'error');
          return false;
        }

        // ✅ 업로드 결과 단번에 반영
        commitKeys(pairs);
        return true;
      } catch {
        showToast('업로드 중 오류가 발생했습니다 \n 잠시 후 다시 시도해 주세요', 'error');
        return false;
      } finally {
        uploadingRef.current = false;
        setLoading(false);
        setNextDisabled(currentStep, false);
      }
    });

    return cleanup;
  }, [
    currentStep,
    hasAnything,
    hasTemp,
    hasCommitted,
    pending,
    uploadAll,
    registerBeforeNext,
    setNextDisabled,
    showToast,
    commitKeys,
  ]);

  return (
    <>
      <Txt>사랑방의 내부 외부 사진을 첨부해 주세요</Txt>
      <UplaodInfo />

      {/* inputRef 하나를 여러 트리거에서 사용 */}
      <HiddenFileInput inputRef={inputRef} onChange={onInputChange} capture='environment' />

      {/* 단일 그리드만 렌더 (blob + s3Key 통합) */}
      <PhotoGrid
        urls={urls}
        onPick={openPicker}
        onRemoveAt={(idx) => {
          const target = items[idx];
          if (!target) return;
          removeById(target.id); // 훅이 revoke + STEP2_REMOVE_ITEM까지 처리
        }}
      />

      <UploadBarButton onClick={openPicker} />

      {loading && <ImageUploadLoading />}
    </>
  );
}
