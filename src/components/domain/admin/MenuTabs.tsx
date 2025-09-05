'use client';

import { List, Plus, Settings, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Txt } from '@/components/atoms';

export default function MenuTabs() {
  const router = useRouter();

  const commonClasses = 'flex flex-col justify-between rounded-[10px] px-4 py-5 text-left h-36';

  return (
    <div className='grid grid-cols-7 gap-3'>
      <button
        className={`${commonClasses} bg-pink-a76/70 col-span-4 text-white`}
        onClick={() => router.push('/admin/stays')}
      >
        <Txt className='text-white' weight='bold'>
          우리 마을 사랑방 <br />
          관리하기
        </Txt>
        <div className='flex justify-end'>
          <Settings size={28} className='text-white' />
        </div>
      </button>

      <button
        className={`${commonClasses} bg-pink-a76/10 col-span-3`}
        onClick={() => router.push('/admin/stays/add')}
      >
        <Txt className='text-pink-a76' weight='bold'>
          사랑방 <br />
          추가하기
        </Txt>
        <div className='flex items-end justify-end'>
          <Plus size={28} className='text-pink-a76' />
        </div>
      </button>

      <button
        className={`${commonClasses} bg-pink-a76/10 col-span-3`}
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
        className={`${commonClasses} bg-pink-a76/50 col-span-4 text-white`}
        onClick={() => router.push('/admin/mypage')}
      >
        <Txt className='text-white' weight='bold'>
          내 정보 수정
        </Txt>
        <div className='flex items-end justify-end'>
          <User size={28} className='text-white' />
        </div>
      </button>
    </div>
  );
}
