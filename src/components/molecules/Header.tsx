'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Txt } from '../atoms';

type Props = {
  title: string;
  showBackButton?: boolean;
  className?: string;
};

/**
 * 헤더 컴포넌트
 * @param title - 헤더 제목
 * @param showBackButton - 뒤로가기 버튼 표시 여부. true일 때는 흰색 배경. 기본값은 false
 * @param className - 추가 스타일 클래스
 * @returns
 */
export default function Header({ title, showBackButton = false, className }: Props) {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <header
      className={cn(
        'bg-green-49d flex h-14 items-center px-2',
        {
          'border-black-626/15 border-b bg-white': showBackButton,
        },
        className,
      )}
    >
      {showBackButton && (
        <button onClick={handleBack}>
          <ChevronLeft size={40} />
        </button>
      )}
      <Txt size={24} className={cn('flex-1', { 'text-white': !showBackButton })}>
        {title}
      </Txt>
      {showBackButton && <div className='w-[40px]' />}
    </header>
  );
}
