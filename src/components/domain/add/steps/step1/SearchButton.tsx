import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type SearchButtonProps = {
  onClick?: () => void;
  className?: string;
};

export function SearchButton({ onClick, className }: SearchButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'border-gray-6d6 inline-flex w-auto items-center justify-center rounded-[10px] border bg-white p-2 hover:bg-gray-300/50',
        className,
      )}
    >
      <Search size={16} />
    </button>
  );
}
