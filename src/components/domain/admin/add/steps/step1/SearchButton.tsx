import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type SearchButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export function SearchButton({ onClick, disabled = false, className }: SearchButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'border-gray-6d6 inline-flex w-auto items-center justify-center rounded-[10px] border bg-white p-2 hover:bg-gray-300/50',
        className,
      )}
    >
      <Search size={16} />
    </button>
  );
}
