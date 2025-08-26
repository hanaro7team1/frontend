import { HomeIcon } from 'lucide-react';
import Image from 'next/image';
import Txt from '@/components/atoms/Text';
import StatusCapsule from './StatusCapsule';

type Props = {
  title: string;
  address: string;
};

export default function StayHeader({ title, address }: Props) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <HomeIcon className='text-gray-070' />
          <Txt size={25} weight='bold' align='left'>
            {title}
          </Txt>
        </div>
        <div className='justify-end'>
          {/* TODO: 실제 예약 상태 연동 */}
          <StatusCapsule status={'예약 가능'} />
        </div>
      </div>

      <Txt align='left'>{address}</Txt>
    </div>
  );
}
