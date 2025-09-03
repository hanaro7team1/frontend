'use client';

import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SLOT_COUNT } from '@/constants/admin/Admin';
import { PreviewImageItem } from '@/types/stays';

export function usePhotoPreview(max = SLOT_COUNT) {
  const [items, setItems] = useState<PreviewImageItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => inputRef.current?.click();

  //업로드 될 파일 미리보기용 hook
  const appendFiles = useCallback(
    (files: File[]) => {
      if (!files?.length) return;
      setItems((prev) => {
        const room = Math.max(0, max - prev.length);
        const slice = files.slice(0, room);
        const appended = slice.map((file) => ({
          id: crypto.randomUUID(),
          file,
          previewUrl: URL.createObjectURL(file),
        }));
        return [...prev, ...appended];
      });
      if (inputRef.current) inputRef.current.value = '';
    },
    [max],
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    appendFiles(Array.from(e.target.files ?? []));
  };

  const removeAt = (idx: number) =>
    setItems((prev) => {
      const u = prev[idx];
      if (u.previewUrl) URL.revokeObjectURL(u.previewUrl);
      return prev.filter((_, i) => i !== idx);
    });

  useEffect(() => {
    return () => items.forEach((it) => URL.revokeObjectURL(it.previewUrl));
  }, []);

  const urls = useMemo(() => items.map((it) => it.previewUrl), [items]);

  return { items, urls, inputRef, openPicker, onInputChange, appendFiles, removeAt };
}
