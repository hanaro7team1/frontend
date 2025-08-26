import Image from 'next/image';
import { Txt } from '@/components/atoms';

export default function AiInfo() {
  return (
    <div className='border-green-49d relative w-full rounded-[10px] border p-[9px]'>
      <Txt size={18} align='left'>
        AI가 소개글 초안을 작성했어요! <br /> 위 글상자를 눌러 내용을 수정할 수 있어요
      </Txt>
      <Image
        src='/images/Img_AI.svg'
        width={70}
        height={70}
        alt='별돌이가 손가락을 들고 무언가 알려주려고 한다'
        className='absolute -top-[2px] -right-[3px]'
      />
    </div>
  );
}
