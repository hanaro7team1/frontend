'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SLOT_COUNT } from '@/constants/admin/add/AddPhoto';

export function usePhotoUpload(max = SLOT_COUNT) {
  const [urls, setUrls] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => inputRef.current?.click();

  //TODO: 추후 S3로 변경
  const appendFiles = useCallback(
    (files: File[]) => {
      if (!files?.length) return;
      const newUrls = files.map((f) => URL.createObjectURL(f));
      setUrls((prev) => {
        const next = [...prev, ...newUrls].slice(0, max);
        // 잘려나간 URL 정리
        if (prev.length + newUrls.length > max) {
          [...prev, ...newUrls].slice(max).forEach((u) => URL.revokeObjectURL(u));
        }
        return next;
      });
      if (inputRef.current) inputRef.current.value = '';
    },
    [max],
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    appendFiles(Array.from(e.target.files ?? []));
  };

  const removeAt = (idx: number) =>
    setUrls((prev) => {
      const u = prev[idx];
      if (u) URL.revokeObjectURL(u);
      return prev.filter((_, i) => i !== idx);
    });

  useEffect(() => () => urls.forEach((u) => URL.revokeObjectURL(u)), [urls]);

  return { urls, inputRef, openPicker, onInputChange, appendFiles, removeAt };
}
