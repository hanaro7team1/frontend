'use client';

import { useRouter } from 'next/navigation';
import { Button, Txt } from '@/components/atoms';

type Props = {
  open: boolean;
  text?: string;
};

export default function NoticeModal({ open, text }: Props) {
  const router = useRouter();
  if (!open) {
    return null;
  }

  const message = `${text}가 변경되었어요`;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
      <div className='mx-4 flex h-[193px] w-full shrink-0 flex-col items-center justify-center gap-9 rounded-[10px] border border-[#DEDEDE] bg-white p-5 shadow-md'>
        <Txt size={26} className='text-center'>
          {message}
        </Txt>
        <Button title='확인' color='pink' onClick={() => router.back()} />
      </div>
    </div>
  );
}
