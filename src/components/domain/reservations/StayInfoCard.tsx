import Image from 'next/image';
import Link from 'next/link';
import { Txt } from '@/components/atoms';

type Props = {
  data: {
    stayPicURL: string;
    stayId: number;
    stayName: string;
    stayAddress: string;
  };
};

export default function StayInfoCard({ data }: Props) {
  const { stayPicURL, stayId, stayName, stayAddress } = data;

  return (
    <div className='flex gap-3'>
      <div className='relative aspect-square w-2/5 shrink-0'>
        <Image src={stayPicURL} alt={stayName} fill className='rounded-[8px] object-cover' />
      </div>

      <div className='flex flex-col justify-between gap-2'>
        <Txt size={22}>{stayName}</Txt>
        <Txt size={18} className='text-gray-070 flex-1'>
          {stayAddress}
        </Txt>
        <Link
          href={`/stays/${stayId}`}
          className='bg-orange-85a flex w-full justify-center rounded-[10px] py-1'
        >
          <Txt className='text-white'>숙소 보러 가기</Txt>
        </Link>
      </div>
    </div>
  );
}
