import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Txt } from '@/components/atoms';

export default function AddStayButton() {
  return (
    <section className='px-4 pt-3'>
      <Link
        href='/admin/stays/add'
        className='bg-pink-a76/10 flex w-full items-center gap-3 rounded-[10px] py-[21px] pl-5'
      >
        <Plus className='text-pink-a76' size={22} />
        <Txt className='text-pink-a76' size={22} weight='bold'>
          사랑방 등록하기
        </Txt>
      </Link>
    </section>
  );
}
