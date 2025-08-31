'use client'

import { Txt } from '@/components/atoms';
import { BottomTabNav, Header } from '@/components/common';
import ListBox from '@/components/domain/festivals/ListBox';
import Image from 'next/image';
import { dummyFestivals } from '../../../public/dummy';
import { useEffect, useState } from 'react';

export default function FestivalsPage() {
  const [hasNext, setHasNext] = useState();
  const [page, setPage] = useState(0);

  useEffect(() => {
    void loadData();
  }, []);

  async function loadData() {
    
  }

  return <>
    <Header title='지역 축제' bgColor='green'/>

    <div className='p-4'>
      <div className='relative rounded-[10px] flex justify-end 
                    border border-[#A6DEDC] bg-green-2f1
                    items-center'>  
          <Image src="/images/Img_Festival.svg" alt='쇼핑' width={107} height={107} className='absolute left-0' />
          <Txt size={24} weight='medium' className='text-center mr-15'>즐거운 지역축제<br />함께 시도해요!</Txt>
      </div>
    </div>

    <div className='flex flex-col p-6 gap-4'>
      {dummyFestivals.map(f => (
        <ListBox key = {f.id} {...f} />
      ))}
    </div>

    <BottomTabNav />
  </>;
}
