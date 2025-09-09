import Image from 'next/image';
import { ReactNode } from 'react';
import { Txt } from '../atoms';

type Props = {
  children: ReactNode;
};

export default function EmptyState({ children }: Props) {
  return (
    <div className='mt-10 flex flex-col items-center gap-6'>
      <Image src='/images/Img_TUNG.png' alt='허수아비가 된 별돌이' width={150} height={150} />
      <Txt className='text-gray-070' align='center'>
        {children}
      </Txt>
    </div>
  );
}
