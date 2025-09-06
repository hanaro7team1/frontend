import Image from 'next/image';
import { ReactNode } from 'react';
import { Txt } from '../atoms';

type Props = {
  children: ReactNode;
};

export default function EmptyState({ children }: Props) {
  return (
    <div className='mt-20 flex flex-col items-center'>
      <Image
        src='/images/Img_Byeoldol-Sad.svg'
        alt='목록이 비어있어 슬픈 별돌이'
        width={150}
        height={150}
      />
      <Txt className='text-gray-070'>{children}</Txt>
    </div>
  );
}
