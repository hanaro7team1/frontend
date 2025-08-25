'use client';

import PhotoTile from './PhotoTile';

type Props = {
  urls: string[];
  slots?: number;
  onPick: () => void;
  onRemoveAt?: (idx: number) => void;
};

export default function PhotoGrid({ urls, slots = 6, onPick, onRemoveAt }: Props) {
  return (
    <div className='border-gray-6d6 grid grid-cols-3 gap-2 rounded-[10px] border p-2'>
      {Array.from({ length: slots }).map((_, i) => (
        <PhotoTile
          key={i}
          preview={urls[i] ?? null}
          onPick={onPick}
          onRemove={urls[i] ? () => onRemoveAt?.(i) : undefined}
        />
      ))}
    </div>
  );
}
