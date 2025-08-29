import Image from 'next/image';
import Link from 'next/link';
import { ShadowBox, Txt } from '@/components/atoms';
import { StaysSearchParams } from '@/types/stays';
import { BottomSheetSchedule, StatusCapsule } from '.';
import { RoomInfo } from '../../../../public/dummy';

type Props = {
  data: RoomInfo;
  isAdmin: boolean;
  searchParams: StaysSearchParams;
};

export default function RoomItem({ data, isAdmin, searchParams }: Props) {
  const { id, name, location, hostName, status, imgUrl } = data;

  const cleanSearchParams = Object.fromEntries(
    Object.entries(searchParams).filter(([, value]) => typeof value === 'string'),
  );
  const params = new URLSearchParams(cleanSearchParams);
  const href = {
    pathname: `/stays/${id}`,
    query: params.toString(),
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
              <Txt className='text-gray-070'>{isAdmin ? hostName + ' 어르신 댁' : location}</Txt>
              <Txt size={22}>{name}</Txt>
            </div>
            <StatusCapsule status={status} />
          </div>
          {isAdmin && (
            <div className='flex gap-2'>
              <div className='bg-black-626/45 flex h-[50px] w-full flex-1 items-center justify-center rounded-[10px]'>
                <Txt className='text-white'>정보 수정하기</Txt>
              </div>
              <BottomSheetSchedule />
            </div>
          )}
        </div>
      </Link>
    </ShadowBox>
  );
}
