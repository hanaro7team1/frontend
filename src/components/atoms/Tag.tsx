import { cn } from '@/lib/utils';
import Txt from './Text';

type Props = {
  label: string;
  className?: string;
};

/**
 * Tag (Chip) 컴포넌트
 * @param label - 표시할 텍스트
 * @param className - Tailwind 추가 클래스
 */
export default function Tag({ label, className }: Props) {
  return (
    <span
      className={cn(
        'border-black-626/15 inline-flex items-center justify-center rounded-full border bg-white px-2.5 py-2',
        className,
      )}
    >
      <Txt size={20} weight='cm' align='center'>
        {label}
      </Txt>
    </span>
  );
}
