'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { ShadowBox, Txt } from '@/components/atoms';

type Props = {
  onClick?: () => void;
};

export default function LoanCard({ onClick }: Props) {
  return (
    <ShadowBox
      onClick={onClick}
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

      <div className='ml-3 flex flex-col'>
        <Txt size={22} align='left'>
          슬기로운 귀촌 생활
        </Txt>
        <Txt size={22} align='left' className='text-green-49d'>
          하나 전세금안심대출
        </Txt>
        <div className='mt-3 flex items-center gap-1' onClick={() => alert('상담하러 가기 클릭')}>
          <Txt size={18} align='left'>
            상담하러 가기
          </Txt>
          <ChevronRight size={20} />
        </div>
      </div>
    </ShadowBox>
  );
}
