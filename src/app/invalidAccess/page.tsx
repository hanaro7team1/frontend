import Image from 'next/image';
import { Txt } from '@/components/atoms';
import { GoBackBtn } from '@/components/common';

export default function InvalidAccessPage() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4 px-6 text-center'>
      <Image src='/images/Img_Home_City.svg' alt='별돌이 이미지' width={100} height={100} />
      <Txt size={60} weight='bold' className='text-green-49d'>
        403
      </Txt>
      <Txt size={22} weight='bold'>
        앗! 접근 권한이 없어요
      </Txt>

      <Txt weight='medium' className='text-green-49d my-10'>
        요기있는 별돌이가 다시 데려다줄게요!
      </Txt>

      <GoBackBtn />
    </div>
  );
}
