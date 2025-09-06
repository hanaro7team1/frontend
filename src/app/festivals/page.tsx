'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Txt } from '@/components/atoms';
import { BottomTabNav, Header } from '@/components/common';
import ListBox from '@/components/domain/festivals/ListBox';
import { usePublicData } from '@/hooks/api/useApi';
import { FestivalListResponse } from '@/types/festivals';

const PAGE_SIZE = 5;

export default function FestivalsPage() {
  const { data } = usePublicData<FestivalListResponse>('/api/festivals');

  // const [events, setEvents] = useState<Festival[]>([]);
  // const [hasNext, setHasNext] = useState(true);
  // const [page, setPage] = useState(0);
  // const [load, setLoad] = useState(false);
  // const sentinelRef = useRef<HTMLDivElement | null>(null);

  // const loadData = useCallback(() => {
  //   if(load || !hasNext) return;
  //   setLoad(true);

  //   const start = page * PAGE_SIZE;
  //   const end = start + PAGE_SIZE;
  //   const chunk = dummyFestivals.slice(start, end);

  //   setEvents(prev => [...prev, ...chunk]);
  //   setHasNext(dummyFestivals[end] !== undefined);
  //   setPage(prev => prev + 1);
  //   setLoad(false);
  // }, [page, load, hasNext]);

  // useEffect(() => {
  //   void loadData();
  // }, [loadData]);

  // useEffect(() => {
  //   const el = sentinelRef.current;
  //   if(!el) return;

  //   const io = new IntersectionObserver(([entry]) => {
  //     if(entry.isIntersecting) {
  //       loadData();
  //     }
  //   }, {root: null,
  //     rootMargin: '150px'});

  //   io.observe(el);
  //   return () => io.disconnect();
  // }, [loadData]);

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

      {/* <div ref={sentinelRef} className='flex items-center justify-center text-gray-6d6'>
      {load ? '불러오는중...' : hasNext ? '스크롤하여 더보기' : '마지막 페이지 입니다'}
    </div> */}

      <BottomTabNav />
    </>
  );
}
