'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShadowBox, Txt } from '@/components/atoms';

export default function LoanCard() {
  const router = useRouter();
  return (
      <ShadowBox
        onClick={() => router.push('/hana')}
        className='flex-row items-center gap-4 bg-white px-4.5 pt-2.5 pb-4'
      >
        <div>
          <Image
            src='/images/Img_Home_City.svg'
            alt='별돌이'
            width={112}
            height={139}
            className='object-contain'
          />
        </div>

        <div className='flex flex-col'>
          <Txt size={22}>슬기로운 귀촌 생활</Txt>
          <Txt size={22} className='text-green-49d'>
            하나 전세금안심대출
          </Txt>
          <div className='mt-3 flex items-center gap-1' onClick={() => router.push('/hana')}>
            <Txt size={18}>상담하러 가기</Txt>
            <ChevronRight size={20} />
          </div>
        </div>
      </ShadowBox>
  );
}
