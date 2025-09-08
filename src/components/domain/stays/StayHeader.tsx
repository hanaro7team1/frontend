import { HomeIcon } from 'lucide-react';
import Txt from '@/components/atoms/Text';
import StatusCapsule from './StatusCapsule';

type Props = {
  title: string;
  address: string;
  stayResrvStatus: '예약 가능' | '예약 마감' | '예약 닫힘';
};

export default function StayHeader({ title, address, stayResrvStatus }: Props) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <HomeIcon className='text-gray-070' />
          <Txt size={25} weight='bold'>
            {title}
          </Txt>
        </div>
        <div className='justify-end'>
          {/* TODO: 실제 예약 상태 연동 */}
          <StatusCapsule status={stayResrvStatus} />
        </div>
      </div>

      <Txt>{address}</Txt>
    </div>
  );
}
