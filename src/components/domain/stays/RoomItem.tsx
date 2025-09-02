import Image from 'next/image';
import Link from 'next/link';
import { ShadowBox, Txt } from '@/components/atoms';
import { StayListItemResponse } from '@/types/stays';
import { StatusCapsule } from '.';

type Props = {
  data: StayListItemResponse;
};

export default function RoomItem({ data }: Props) {
  const { id, imageURL, address, title, stayResrvStatus } = data;

  return (
    <ShadowBox>
      <Link href={`/stays/${id}`}>
        <div className='relative h-[140px] overflow-hidden'>
          <Image src={imageURL} alt={title} fill className='object-fill' />
        </div>
        <div className='flex items-start justify-between p-3'>
          <div className='flex flex-col items-start gap-2'>
            <Txt className='text-gray-070'>{address}</Txt>
            <Txt size={22}>{title}</Txt>
          </div>
          <StatusCapsule status={stayResrvStatus} />
        </div>
      </Link>
    </ShadowBox>
  );
}
