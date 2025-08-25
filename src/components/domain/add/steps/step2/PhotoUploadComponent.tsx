import { Plus } from 'lucide-react';

export default function PhotoUploadComponent() {
  return (
    <button className='flex aspect-square w-full items-center justify-center rounded-[10px] bg-gray-200'>
      <Plus className='h-5 w-5' />
    </button>
  );
}
