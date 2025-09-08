'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function HanaBankPage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 후 show를 true로 바꿔서 transition 동작
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='flex h-full flex-col items-center justify-center bg-white'>
      <Image
        src='/icons/Ic-HanaBank.svg'
        alt='하나은행 로고'
        width={190}
        height={190}
        className={`transition-all duration-1000 ease-out ${
          show ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      />
    </div>
  );
}
