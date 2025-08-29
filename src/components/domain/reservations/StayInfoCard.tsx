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
  isAdmin?: boolean;
};

export default function StayInfoCard({ data, isAdmin = false }: Props) {
  const { stayPicURL, stayId, stayName, stayAddress } = data;

  return (
    <div className='flex gap-3'>
      <div
        className={`relative shrink-0 rounded-[8px] ${isAdmin ? 'h-[100px] w-[100px]' : 'aspect-square w-2/5'} `}
      >
        <Image src={stayPicURL} alt={stayName} fill className='rounded-[8px] object-cover' />
      </div>

      <div className='flex flex-1 flex-col justify-between gap-2'>
        <div className='flex flex-col p-1'>
          <Txt size={22}>{stayName}</Txt>
          <Txt size={18} className='text-gray-070'>
            {stayAddress}
          </Txt>
        </div>
        {!isAdmin && (
          <Link
            href={`/stays/${stayId}`}
            className='bg-orange-85a flex w-full justify-center rounded-[10px] py-1'
          >
            <Txt className='text-white'>숙소 보러 가기</Txt>
          </Link>
        )}
      </div>
    </div>
  );
}
