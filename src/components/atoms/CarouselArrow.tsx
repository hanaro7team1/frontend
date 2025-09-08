import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

/**
 * Carousel Arrow Button (with SVG icon)
 * @param direction - 'left' | 'right'
 * @param onClick - 클릭 이벤트
 * @param disabled - 클릭 이벤트 비활성화
 * @param className - 추가 스타일
 */
export default function CarouselArrow({ direction, onClick, disabled, className }: Props) {
  const iconSrc = direction === 'left' ? '/icons/Ic_ChevronLeft.svg' : '/icons/Ic_ChevronRight.svg';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'absolute top-1/2 -translate-y-1/2 rounded bg-black/40',
        direction === 'left' ? 'left-1' : 'right-1',
        className,
      )}
    >
      <Image src={iconSrc} alt={`${direction} arrow`} width={22} height={51} />
    </button>
  );
}
