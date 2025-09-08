import Image from 'next/image';
import { Txt } from '@/components/atoms';
import { BottomTabNav, Header } from '@/components/common';
import ListBox from '@/components/domain/festivals/ListBox';
import { FestivalListResponse } from '@/types/festivals';
import { publicApi } from '@/lib/axios';

export default async function FestivalsPage() { 
  const { data } = await publicApi<FestivalListResponse>('/api/festivals');

  return (
    <>
      <Header title='지역 축제' bgColor='green' />

      <div className='p-4'>
        <div className='border-green-edc bg-green-2f1 relative flex items-center justify-center rounded-[10px] border'>
          <Image
            src='/images/Img_Festival.svg'
            alt='쇼핑'
            width={107}
            height={107}
            className='absolute left-0'
          />
          <Txt size={24} weight='medium' className='ml-15 text-center'>
            즐거운 지역축제
            <br />
            함께 시도해요!
          </Txt>
        </div>
      </div>

      <div className='flex flex-col gap-8 p-5 pb-25'>
        {data?.dtoList.map((festival) => (
          <ListBox key={festival.id} data={festival} />
        ))}
      </div>
      
      <BottomTabNav />
    </>
  );
}
