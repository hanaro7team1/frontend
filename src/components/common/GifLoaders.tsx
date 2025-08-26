'use client';

type Props = {
  path: string;
  height?: number | string;
  size?: number | string;
  alt?: string;
};

export default function GifLoader({
  path = '/loaders/spin.gif',
  height = 240,
  size = 110,
  alt = '잠시만 기다려 주세요',
}: Props) {
  return (
    <div className='' style={{ height: height }} role='status' aria-busy='true'>
      <img
        src={path}
        alt={alt}
        loading='eager'
        decoding='async'
        draggable={false}
        className='select-none'
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
        }}
      />
    </div>
  );
}
