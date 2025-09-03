import Image from 'next/image';
import Link from 'next/link';
import { Txt } from '@/components/atoms';

type Props = {
  data: {
    imageUrl: string;
    stayId: number;
    title: string;
    address: string;
  };
  isAdmin?: boolean;
};

export default function StayInfoCard({ data, isAdmin = false }: Props) {
  const { imageUrl, stayId, title, address } = data;

  return (
    <div className='flex gap-3'>
      <div
        className={`relative shrink-0 rounded-[8px] ${isAdmin ? 'h-[100px] w-[100px]' : 'aspect-square w-2/5'} `}
      >
        <Image src={imageUrl} alt={title} fill className='rounded-[8px] object-cover' />
      </div>

      <div className='flex flex-1 flex-col justify-between gap-2'>
        <div className='flex flex-col gap-2 p-1'>
          <Txt size={22}>{title}</Txt>
          <Txt size={18} className='text-gray-070 break-keep whitespace-normal'>
            {address}
          </Txt>
        </div>
        {!isAdmin && (
          <Link
            href={`/stays/${stayId}`}
            className='bg-orange-85a flex w-full justify-center rounded-[10px] py-1.5'
          >
            <Txt className='text-white'>숙소 보러 가기</Txt>
          </Link>
        )}
      </div>
    </div>
  );
}
