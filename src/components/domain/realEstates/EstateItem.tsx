import Image from 'next/image';
import Link from 'next/link';
import { ShadowBox, Txt } from '@/components/atoms';
import { RoomInfo } from '../../../../public/dummy';

type Props = {
  // TODO: 추후 실제 DTO로 수정 예정
  data: RoomInfo & { price: string };
};

export default function EstateItem({ data }: Props) {
  const { id, name, location, price, imgUrl } = data;

  const href = {
    pathname: `/real-estates/${id}`,
  };

  return (
    <ShadowBox>
      <Link href={href}>
        <Image
          src={imgUrl}
          alt={name}
          width={0}
          height={0}
          sizes='100vw'
          className='h-[140px] w-full'
        />
        <div className='space-y-4 p-3'>
          <div className='flex items-start justify-between pl-1'>
            <div className='flex flex-col items-start gap-2'>
              <Txt className='text-gray-070'>{location}</Txt>
              <Txt size={22}>{price}</Txt>
            </div>
          </div>
        </div>
      </Link>
    </ShadowBox>
  );
}
