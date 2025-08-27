import { Plus, X } from 'lucide-react';

type Props = {
  preview?: string | null;
  onPick: () => void;
  onRemove?: () => void;
};

export default function PhotoTile({ preview, onPick, onRemove }: Props) {
  return (
    <div className='aspect-square'>
      <button
        type='button'
        onClick={onPick}
        className='bg-gray-6d6 relative flex h-full w-full items-center justify-center overflow-hidden rounded-[10px]'
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt='사진을 등록하거나 등록한 사진을 확인할 수 있습니다'
              className='h-full w-full object-cover'
            />
            {onRemove && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className='bg-black-626/70 absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full text-white'
                title='삭제'
              >
                <X className='h-4 w-4' />
              </span>
            )}
          </>
        ) : (
          <Plus className='h-6 w-6' color='var(--code-theme7)' />
        )}
      </button>
    </div>
  );
}
