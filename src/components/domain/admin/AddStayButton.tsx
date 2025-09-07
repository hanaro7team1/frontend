'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Txt } from '@/components/atoms';

export default function AddStayButton() {
  const router = useRouter();

  return (
    <section className='px-4 pt-3'>
      <button
        className={'bg-pink-a76/10 flex w-full items-center gap-3 rounded-[10px] py-[21px] pl-5'}
        onClick={() => router.push('/admin/stays/add')}
      >
        <Plus className='text-pink-a76 items-center' size={22} />
        <Txt className='text-pink-a76' size={22} weight='bold'>
          사랑방 등록하기
        </Txt>
      </button>
    </section>
  );
}
