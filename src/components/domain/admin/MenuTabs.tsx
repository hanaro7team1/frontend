'use client';

import { House, List, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Txt } from '@/components/atoms';

export default function MenuTabs() {
  const router = useRouter();

  const commonClasses = 'flex flex-col justify-between rounded-[10px] p-6 text-left';

  return (
    <div className='flex flex-col gap-3'>
      <button
        className='bg-pink-a76/70 flex h-24 w-full items-center justify-between rounded-[10px] p-6 text-white'
        onClick={() => router.push('/admin/stays')}
      >
        <Txt className='text-white' weight='bold'>
          우리 마을 사랑방
          <br /> 관리하기
        </Txt>
        <House size={28} className='text-white' />
      </button>

      <div className='grid grid-cols-2 gap-3'>
        <button
          className={`${commonClasses} bg-pink-a76/10 h-36`}
          onClick={() => router.push('/stays')}
        >
          <Txt className='text-pink-a76' weight='bold'>
            전체 사랑방 <br />
            구경하기
          </Txt>
          <div className='flex items-end justify-end'>
            <List size={28} className='text-pink-a76' />
          </div>
        </button>

        <button
          className={`${commonClasses} bg-pink-a76/50 h-36 text-white`}
          onClick={() => router.push('/admin/mypage')}
        >
          <Txt className='text-white' weight='bold'>
            내 정보 <br />
            수정하기
          </Txt>
          <div className='flex items-end justify-end'>
            <User size={28} className='text-white' />
          </div>
        </button>
      </div>
    </div>
  );
}
