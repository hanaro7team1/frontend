'use client';

import { ChangeEvent, useCallback, useMemo, useRef } from 'react';
import { useWizardData } from '@/components/domain/admin/add/wizard/WizardDataProvider';
import { keyToPublicUrl } from '@/utils/stays/stays';
import { SLOT_COUNT } from '@/constants/admin/Admin';

export function usePhotoPreview(max = SLOT_COUNT) {
  const { data, dispatch } = useWizardData();
  const items = useMemo(() => data.step2?.items ?? [], [data.step2?.items]);

  const inputRef = useRef<HTMLInputElement>(null);
  const openPicker = () => inputRef.current?.click();

  const capacityLeft = Math.max(0, max - items.length);

  // 화면 표시용 URL (blobUrl 우선 → s3Key URL)
  const getDisplayUrl = useCallback((it: { blobUrl?: string; s3Key?: string }) => {
    if (it.blobUrl) return it.blobUrl;
    if (it.s3Key) {
      return keyToPublicUrl(it.s3Key);
    }
    return '';
  }, []);

  // 파일 추가 (append). room 만큼만 보냄.
  const addFiles = useCallback(
    (files: File[]) => {
      if (!files?.length || capacityLeft <= 0) return;
      const slice = files.slice(0, capacityLeft);
      dispatch({ type: 'STEP2_ADD_FILES', payload: { files: slice } });
    },
    [capacityLeft, dispatch],
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    addFiles(Array.from(e.target.files));
    e.target.value = ''; // 같은 파일 재선택 허용
  };

  // 삭제: 미리 blobUrl 정리 후 액션 디스패치(리듀서는 그냥 제거만 하므로 메모리 누수 방지)
  const removeById = useCallback(
    (id: string) => {
      const target = items.find((x) => x.id === id);
      if (target?.blobUrl) URL.revokeObjectURL(target.blobUrl);
      dispatch({ type: 'STEP2_REMOVE_ITEM', payload: { id } });
    },
    [dispatch, items],
  );

  // 업로드 성공 반영 (여러 개 매핑)
  const commitKeys = useCallback(
    (pairs: { id: string; s3Key: string }[]) => {
      if (!pairs?.length) return;
      dispatch({ type: 'STEP2_COMMIT_KEYS', payload: { pairs } });
    },
    [dispatch],
  );

  // 업로드 성공 반영 (단건 편의 함수)
  const commitKey = useCallback(
    (id: string, s3Key: string) => commitKeys([{ id, s3Key }]),
    [commitKeys],
  );

  // 업로드 대기중(파일 있지만 s3Key 없음)
  const pending = useMemo(() => items.filter((x) => x.file && !x.s3Key), [items]);

  // 전체 초기화 (리듀서에서 revoke 처리)
  const clearAll = useCallback(() => {
    dispatch({ type: 'STEP2_CLEAR' });
  }, [dispatch]);

  return {
    items,
    inputRef,
    openPicker,
    onInputChange,
    addFiles,
    commitKeys,
    commitKey,
    removeById,
    clearAll,
    getDisplayUrl,
    pending,
    capacityLeft,
  };
}
