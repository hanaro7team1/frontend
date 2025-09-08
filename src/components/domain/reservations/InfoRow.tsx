import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent } from 'react';
import { Txt } from '@/components/atoms';

type Props = {
  icon: ForwardRefExoticComponent<LucideProps>;
  label: string;
  value: string;
};

export default function InfoRow({ icon: Icon, label, value }: Props) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex gap-2.5'>
        <Icon color='var(--code-theme7)' size={26} />
        <Txt size={18} className='text-gray-070'>
          {label}
        </Txt>
      </div>
      <div className='flex'>
        {label === '면적' && <Txt>약&nbsp;</Txt>}
        <Txt size={value.length > 14 ? 18 : 20}>{value}</Txt>
        {label === '이름' && <Txt className='text-gray-070'>&nbsp;님</Txt>}
        {label === '면적' && <Txt>평</Txt>}
        {label.endsWith('인원') && <Txt>명</Txt>}
      </div>
    </div>
  );
}
