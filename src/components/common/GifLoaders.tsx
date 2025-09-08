'use client';

import Image from 'next/image';

type Props = {
  path: string;
  size: number;
  alt?: string;
};

export default function GifLoader({
  path = '/loaders/spin.gif',
  size = 110,
  alt = '잠시만 기다려 주세요',
}: Props) {
  return (
    <div className='' role='status' aria-busy='true'>
      <Image
        src={path}
        alt={alt}
        loading='eager'
        decoding='async'
        draggable={false}
        width={size}
        height={size}
        unoptimized
      />
    </div>
  );
}
