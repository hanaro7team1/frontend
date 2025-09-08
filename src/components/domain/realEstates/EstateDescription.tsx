import Image from 'next/image';
import { Txt } from '@/components/atoms';

type Props = {
  description: string;
  areaSize: number;
  roomCount: number;
  house: string;
};

export default function EstateDescription({ description, areaSize, roomCount, house }: Props) {
  return (
    <>
      <section className={'h-39 w-full overflow-y-auto'}>
        <div className='flex flex-col'>
          <Txt className='text-gray-070'>{description}</Txt>
        </div>
      </section>
      <section className='flex flex-col gap-4'>
        {/* 면적 */}
        <div className='flex items-center gap-3'>
          <Image src='/icons/Ic_Increase.svg' alt='면적' width={24} height={24} />
          <Txt>
            {areaSize} m<sup>2</sup>
          </Txt>
        </div>

        {/* 방 개수 */}
        <div className='flex items-center gap-3'>
          <Image src='/icons/Ic_Room.svg' alt='방 개수' width={24} height={24} />
          <Txt>방 {roomCount}개</Txt>
        </div>

        {/* 집 형태 */}
        <div className='flex items-center gap-3'>
          <Image src='/icons/Ic_House.svg' alt='집 형태' width={24} height={24} />
          <Txt>{house}</Txt>
        </div>
      </section>
    </>
  );
}
