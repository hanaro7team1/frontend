import Image from 'next/image';
import { Txt } from '@/components/atoms';

export default function SplashPage() {
  return (
    <div className='bg-gray-7f9 flex h-screen flex-col items-center justify-center gap-5'>
      <div className='flex flex-col items-center'>
        <Image src='/images/Img_SIDO_LOGO_2.png' alt='시도 로고' width={100} height={100} />
        <Txt className='text-gray-070'>시골과 도시의 연결</Txt>
      </div>

      <Image src='/images/Img_Splash.svg' alt='시도 로고' width={200} height={230} />
    </div>
  );
}
