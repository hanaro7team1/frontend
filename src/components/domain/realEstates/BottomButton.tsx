'use client';

import Link from 'next/link';
import { Button } from '@/components/atoms';

type Props = {
  text?: string;
  disabled?: boolean;
};

export default function BottomButton({ text = '문의하기', disabled = false }: Props) {
  return (
    <div className='fixed inset-x-0 bottom-0 z-50 mx-auto w-full border-t border-gray-200 bg-white p-4 sm:max-w-sm'>
      <Link href='/hana' className='block'>
        <Button title={text} color='green' disabled={disabled} />
      </Link>
    </div>
  );
}
