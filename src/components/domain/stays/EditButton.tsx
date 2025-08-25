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
        'bg-black-626/45 flex h-[30px] w-[81px] flex-shrink-0 items-center justify-center rounded-full',
        className,
      )}
    >
      <Txt size={16} weight='cm' className='text-white'>
        변경하기
      </Txt>
    </button>
  );
}
