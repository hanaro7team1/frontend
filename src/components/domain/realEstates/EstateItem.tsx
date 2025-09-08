import Image from 'next/image';
import Link from 'next/link';
import { ShadowBox, Txt } from '@/components/atoms';
import { EstatesListItemResponse } from '@/types/real-estates';

type Props = {
  data: EstatesListItemResponse;
};

export default function EstateItem({ data }: Props) {
  const { id, tradeType, location, price, imageUrl } = data;

  return (
    <ShadowBox>
      <Link href={`/real-estates/${id}`}>
        <div className='relative h-[140px] overflow-hidden'>
          <Image
            src={imageUrl || '/images/sample1.png'}
            alt={location + tradeType + price}
            fill
            className='object-cover'
          />
        </div>
        <div className='flex flex-col items-start gap-2 p-3'>
          <Txt className='text-gray-070'>{location}</Txt>
          <Txt size={22}>{tradeType + ' ' + price}</Txt>
        </div>
      </Link>
    </ShadowBox>
  );
}
