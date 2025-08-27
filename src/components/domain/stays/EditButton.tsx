'use client';

import { cn } from '@/lib/utils';
import { Txt } from '@/components/atoms';

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

export default function EditButton({ onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-black-626/45 flex flex-shrink-0 items-center justify-center rounded-full px-4 py-1.5',
        className,
      )}
    >
      <Txt size={16} className='text-white'>
        변경하기
      </Txt>
    </button>
  );
}
