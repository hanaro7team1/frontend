'use client'

import { Txt } from '@/components/atoms';
import { BottomTabNav, Header } from '@/components/common';
import ListBox from '@/components/domain/festivals/ListBox';
import Image from 'next/image';
import { dummyFestivals } from '../../../public/dummy';
import { useCallback, useEffect, useRef, useState } from 'react';

const PAGE_SIZE = 4;

export default function FestivalsPage() {
  type Festival = typeof dummyFestivals[number];

  const [events, setEvents] = useState<Festival[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadData = useCallback(() => {
    if(load || !hasNext) return;
    setLoad(true);

    const start = page * PAGE_SIZE;
    const end = page + PAGE_SIZE;
    const chunk = dummyFestivals.slice(start, end);

    setEvents(prev => [...prev, ...chunk]);
    setHasNext(end < dummyFestivals.length);
    setPage(prev => prev + 1);
    setLoad(false);
  }, [page, load, hasNext]);

  useEffect(() => {
    void loadData();
  }, []);

  useEffect(() => {
    const el = sentinelRef.current;
    if(!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting) loadData();
    }, {rootMargin: '100px'});

    io.observe(el);
    return () => io.disconnect();
  }, [loadData]);

  return <>
    <Header title='지역 축제' bgColor='green'/>

    <div className='p-4'>
      <div className='relative rounded-[10px] flex justify-end 
                    border border-green-edc bg-green-2f1
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

    <div ref={sentinelRef} className='flex items-center justifiy justify-center text-gray-6d6'>
      {load ? '불러오는중...' : hasNext ? '스크롤하여 더보기' : ''}
    </div>

    <BottomTabNav />
  </>;
}
