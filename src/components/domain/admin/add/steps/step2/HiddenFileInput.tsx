'use client';

import { ChangeEvent, RefObject } from 'react';

type Props = {
  inputRef: RefObject<HTMLInputElement | null>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  multiple?: boolean;
  capture?: 'environment' | 'user' | boolean;
};

export default function HiddenFileInput({
  inputRef,
  onChange,
  accept = 'image/*',
  multiple = true,
  capture,
}: Props) {
  return (
    <input
      ref={inputRef}
      type='file'
      accept={accept}
      multiple={multiple}
      onChange={onChange}
      className='sr-only'
      {...(capture ? { capture: typeof capture === 'string' ? capture : undefined } : {})}
    />
  );
}
