'use client';

import useSWRInfinite from 'swr/infinite';
import { useEffect, useRef } from 'react';
import { publicApi } from '@/lib/axios';
import { Txt } from '@/components/atoms';
import { EmptyState } from '@/components/common';
import { StayListResponse, StaysSearchParams } from '@/types/stays';
import { RoomItem } from '.';

type Props = {
  searchParams: StaysSearchParams;
  initialData: StayListResponse; // SSR 첫 페이지 데이터
};

export default function RoomList({ searchParams, initialData }: Props) {
  const getKey = (pageIndex: number, previousPageData: StayListResponse) => {
    if (previousPageData && !previousPageData.hasNext) return null; // 마지막 페이지
    return ['/api/stays', { ...searchParams, page: pageIndex + 1, listSize: 10 }];
  };

  const fetcher = async ([url, params]: [string, any]) => {
    const { data } = await publicApi.get<StayListResponse>(url, { params });
    return data;
  };

  // 무한스크롤
  const { data, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher, {
    fallbackData: [initialData],
    revalidateFirstPage: false,
  });

  const rooms = data ? data.flatMap((page) => page.dtoList) : [];

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
    <div className='m-4 space-y-4'>
      {!rooms.length ? (
        <EmptyState>
          조건에 맞는 숙소가 없어요
          <br /> 다른 조건으로 찾아 보세요
        </EmptyState>
      ) : (
        rooms.map((room) => <RoomItem key={room.id} data={room} searchParams={searchParams} />)
      )}
      {/* 로딩 트리거 */}
      <div ref={loadMoreRef} className='h-10' />
      {isValidating && <Txt className='py-2 text-center'>불러오는 중...</Txt>}
    </div>
  );
}
