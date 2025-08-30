import { UserLock, UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Txt } from '@/components/atoms';

export default function AuthPage() {
  return (
    <div className='bg-gray-7f9 flex h-screen w-full flex-col items-center justify-center gap-10'>
      <div className='flex flex-col gap-3'>
        <div className='relative size-[150px] overflow-hidden rounded-full'>
          <Image
            src='/images/Img_Splash.svg'
            alt='시도 로고'
            fill
            className='object-cover object-top'
          />
        </div>

        <div className='flex flex-col items-center'>
          <Image src='/images/Img_SIDO_LOGO_2.png' alt='시도 로고' width={80} height={80} />
          <Txt className='text-gray-070'>시골과 도시의 연결</Txt>
        </div>
      </div>

      <div className='flex w-full flex-col gap-4 px-10'>
        <Link
          href='/auth/signin'
          className='bg-pink-09f flex w-full items-center justify-between rounded-[10px] px-6 py-4'
        >
          <UserLock color='white' size={30} />
          <Txt size={20} weight='bold' align='center' className='flex-1 text-white'>
            로그인 하러 가기
          </Txt>
        </Link>
        <Link
          href='/auth/signup'
          className='border-pink-09f flex w-full items-center justify-between rounded-[10px] border bg-white px-6 py-4'
        >
          <UserPlus color='var(--code-theme11)' size={30} />
          <Txt size={20} weight='bold' align='center' className='text-pink-09f flex-1'>
            회원가입 하러 가기
          </Txt>
        </Link>
      </div>
    </div>
  );
}
