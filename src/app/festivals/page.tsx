import Image from 'next/image';
import { Txt } from '@/components/atoms';
import { BottomTabNav, Header } from '@/components/common';
import { FestivalListResponse } from '@/types/festivals';
import { publicApi } from '@/lib/axios';
import FestivalList from '@/components/domain/festivals/FestivalList';

export default async function FestivalsPage() { 
  const { data } = await publicApi<FestivalListResponse>('/api/festivals?page=1&listSize=5');

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

      <FestivalList firstList={data}/>
      
      <BottomTabNav />
    </>
  );
}
