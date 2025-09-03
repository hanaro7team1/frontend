import Image from 'next/image';
import Link from 'next/link';
import { ShadowBox, Txt } from '@/components/atoms';
import { RoomInfo } from '../../../../public/dummy';

type Props = {
  // TODO: 추후 실제 DTO로 수정 예정
  data: RoomInfo & { price: string };
};

export default function EstateItem({ data }: Props) {
  const { id, name: title, location, price, imgUrl: imageURL } = data;

  return (
    <ShadowBox>
      <Link href={`/real-estates/${id}`}>
        <div className='relative h-[140px] overflow-hidden'>
          <Image
            src={imageURL ?? '/images/sample1.png'}
            alt={title}
            fill
            className='object-cover'
          />
        </div>
        <div className='flex flex-col items-start gap-2 p-3'>
          <Txt className='text-gray-070'>{location}</Txt>
          <Txt size={22}>{price}</Txt>
        </div>
      </Link>
    </ShadowBox>
  );
}
