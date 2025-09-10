'use client';

import useSWRInfinite from 'swr/infinite';
import { useEffect, useRef } from 'react';
import { publicApi } from '@/lib/axios';
import { Txt } from '@/components/atoms';
import { FestivalListResponse } from '@/types/festivals';
import { StaysSearchParams } from '@/types/stays';
import ListBox from './ListBox';

type Props = {
  initialData: FestivalListResponse; // SSR 첫 페이지 데이터
};

export default function FestivalList({ initialData }: Props) {
  const getKey = (pageIndex: number, previousPageData: FestivalListResponse) => {
    if (previousPageData && !previousPageData.hasNext) return null; // 마지막 페이지
    return ['/api/festivals', { page: pageIndex + 1, listSize: 10 }];
  };

  const fetcher = async ([url, params]: [string, StaysSearchParams]) => {
    const { data } = await publicApi.get<FestivalListResponse>(url, { params });
    return data;
  };

  // 무한스크롤
  const { data, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher, {
    fallbackData: [initialData],
    revalidateFirstPage: false,
  });

  const festivals = data ? data.flatMap((page) => page.dtoList) : [];

  // 무한 스크롤 IntersectionObserver
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isValidating) {
        setSize(size + 1);
      }
    });

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [size, setSize, isValidating]);

  return (
    <div className='flex flex-col gap-8 p-5 pb-25'>
      {festivals.map((festival) => (
        <ListBox key={festival.id} data={festival} />
      ))}
      {/* 로딩 트리거 */}
      <div ref={loadMoreRef} className='h-10' />
      {isValidating && <Txt className='py-2 text-center'>불러오는 중...</Txt>}
    </div>
  );
}
