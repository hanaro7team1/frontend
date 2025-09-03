'use client';

import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent } from 'react';
import { Txt } from '@/components/atoms';

type Props = {
  icon: ForwardRefExoticComponent<LucideProps>;
  label: string;
  value: string;
};

export default function ModalInfo({ icon: Icon, label, value }: Props) {
  return (
    <div className='flex flex-col items-start gap-2'>
      <div className='flex items-center gap-2'>
        <Icon className='text-gray-070 h-5 w-5 flex-shrink-0' />
        <Txt size={16} className='text-gray-070' align='center'>
          {label}
        </Txt>
      </div>
      <Txt size={18} weight='medium'>
        {value}
      </Txt>
    </div>
  );
}
