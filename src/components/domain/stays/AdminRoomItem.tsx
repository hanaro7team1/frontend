import Image from 'next/image';
import Link from 'next/link';
import { ShadowBox, Txt } from '@/components/atoms';
import { AdminStayListItemResponse } from '@/types/stays';
import { BottomSheetSchedule, StatusCapsule } from '.';

type Props = {
  data: AdminStayListItemResponse;
};

export default function AdminRoomItem({ data }: Props) {
  const { id, imageURL, hostName, title, stayResrvStatus } = data;

  return (
    <ShadowBox>
      <Link href={`/stays/${id}`}>
        <div className='relative h-[140px] overflow-hidden'>
          <Image src={imageURL} alt={title} fill className='object-cover' />
        </div>
        <div className='space-y-4 p-3'>
        <div className='flex flex-col gap-2'>
              <Txt className='text-gray-070'>{hostName + ' 어르신 댁'}</Txt>

          <div className='flex justify-between'>
              <Txt size={22}>{title}</Txt>
            <StatusCapsule status={stayResrvStatus} />
          </div>
          </div>
          <div className='flex gap-2'>
            <div className='bg-black-626/45 flex h-[50px] w-full flex-1 items-center justify-center rounded-[10px]'>
              <Txt className='text-white'>정보 수정하기</Txt>
            </div>
            <BottomSheetSchedule />
          </div>
        </div>
      </Link>
    </ShadowBox>
  );
}
