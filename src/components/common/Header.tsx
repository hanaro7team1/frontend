'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Txt } from '../atoms';

type Props = {
  title: string;
  bgColor?: 'white' | 'green' | 'pink';
  withoutBorder?: boolean;
  className?: string;
};

/**
 * 헤더 컴포넌트
 * @param title - 헤더 텍스트
 * @param bgColor - 헤더 배경색. 'white', 'green', 'pink'. 기본값은 'white'
 * @param withoutBorder - 흰색 배경일 때, 헤더 하단의 border를 없앨지 여부. 기본값은 false
 * @param className - 추가 스타일 클래스
 * @returns
 */
export default function Header({
  title,
  bgColor = 'white',
  withoutBorder = false,
  className,
}: Props) {
  const router = useRouter();
  const handleBack = () => router.back();

  const isWhiteBg = bgColor === 'white';

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-14 w-full items-center bg-white px-2',
        {
          'border-black-626/15 border-b': isWhiteBg && !withoutBorder,
          'bg-pink-09f': bgColor === 'pink',
          'bg-green-49d': bgColor === 'green',
        },
        className,
      )}
    >
      {isWhiteBg && (
        <button onClick={handleBack}>
          <ChevronLeft size={40} />
        </button>
      )}
      <Txt size={24} className={cn('flex-1', { 'text-white': !isWhiteBg })}>
        {title}
      </Txt>
      {isWhiteBg && <div className='w-[40px]' />}
    </header>
  );
}
