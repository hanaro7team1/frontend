import Image from 'next/image';
import { Txt } from '@/components/atoms';

export default function UplaodInfo() {
  return (
    <div className='bg-pink-09f/40 relative w-full rounded-[10px] border p-5'>
      <Txt className='text-black-626 whitespace-pre-line'>
        사진을 신중하게 고르면 좋아요
        <br />
      </Txt>
      <Txt size={18} className='text-gray-070'>
        첫 번째 사진은 대표 사진과 <br /> AI 설명 생성에 활용됩니다
      </Txt>
      <Image
        src='/images/Img_AI.svg'
        width={100}
        height={100}
        alt='별돌이가 손가락을 들고 무언가 알려주려고 한다'
        className='absolute top-[8px] right-[3px]'
      />
    </div>
  );
}
