import { HomeIcon } from 'lucide-react';
import Txt from '@/components/atoms/Text';

type Props = {
  price: string;
  address: string;
};

export default function StayHeader({ price, address }: Props) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <HomeIcon className='text-gray-070' />
          <Txt size={24} className='text-gray-070'>
            {address}
          </Txt>
        </div>
        <div className='justify-end'></div>
      </div>

      <Txt size={28}>{price}</Txt>
    </div>
  );
}
