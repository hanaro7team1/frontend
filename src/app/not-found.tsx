'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='my-20 flex flex-col items-center justify-center'>
      <section className='mt-32 text-center'>
        <div className='mb-3 text-4xl font-[600]'>404 ERROR</div>
        <div className='mb-14 font-[500]'>죄송합니다. 페이지를 찾을 수 없습니다.</div>
      </section>

      <button
        className='bg-button-lightgray mt-16 w-56 rounded-2xl px-9 py-3 text-base font-[500]'
        onClick={() => router.push('/')}
      >
        메인으로
      </button>
    </div>
  );
}
