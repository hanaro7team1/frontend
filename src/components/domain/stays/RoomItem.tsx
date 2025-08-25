import Image from 'next/image';
import Link from 'next/link';
import { ShadowBox, Txt } from '@/components/atoms';
import { OpenDateModalBtn, StatusCapsule } from '.';
import { RoomInfo } from '../../../../public/dummy';

export default function RoomItem({ item }: { item: RoomInfo }) {
  const { id, name, location, hostName, status, imgUrl } = item;

  const isAdmin = false; // TODO: 추후에 세션에서 관리자 여부 읽어오기

  return (
    <ShadowBox>
      <Link href={`/stays/${id}`}>
        <Image
          src={imgUrl}
          alt={name}
          width={0}
          height={0}
          sizes='100vw'
          className='h-auto w-full'
        />
        <div className='space-y-4 px-4 pt-3 pb-5'>
          <div className='flex items-start justify-between pl-1'>
            <div className='flex flex-col items-start gap-2'>
              <Txt className='text-gray-070'>{isAdmin ? hostName + ' 어르신 댁' : location}</Txt>
              <Txt size={22}>{name}</Txt>
            </div>
            <StatusCapsule status={status} />
          </div>
          {isAdmin && (
            <div className='flex gap-3'>
              <div className='bg-black-626/45 flex h-[50px] w-full items-center justify-center rounded-[10px]'>
                <Txt className='text-white'>정보 수정하기</Txt>
              </div>
              <OpenDateModalBtn />
            </div>
          )}
        </div>
      </Link>
    </ShadowBox>
  );
}
