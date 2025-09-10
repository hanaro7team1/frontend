'use client';

import useSWRInfinite from 'swr/infinite';
import { useEffect, useRef } from 'react';
import { publicApi } from '@/lib/axios';
import { Txt } from '@/components/atoms';
import { EmptyState } from '@/components/common';
import { EstatesListResponse, RealEstatesSearchParams } from '@/types/real-estates';
import { EstateItem } from '.';

type Props = {
  searchParams: RealEstatesSearchParams;
  initialData: EstatesListResponse; // SSR 첫 페이지 데이터
};

export default function EstatesList({ searchParams, initialData }: Props) {
  const getKey = (pageIndex: number, previousPageData: EstatesListResponse) => {
    if (previousPageData && !previousPageData.hasNext) return null; // 마지막 페이지
    return ['/api/real-estates', { ...searchParams, page: pageIndex + 1, listSize: 10 }];
  };

  const fetcher = async ([url, params]: [string, RealEstatesSearchParams]) => {
    const { data } = await publicApi.get<EstatesListResponse>(url, { params });
    return data;
  };

  // 무한스크롤
  const { data, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher, {
    fallbackData: [initialData],
    revalidateFirstPage: false,
  });

  const estates = data ? data.flatMap((page) => page.dtoList) : [];

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
    <div className='m-4 space-y-4 pb-20'>
      {!estates.length ? (
        <EmptyState>
          조건에 맞는 매물이 없어요
          <br /> 다른 조건으로 찾아 보세요
        </EmptyState>
      ) : (
        estates.map((estate) => <EstateItem key={estate.id} data={estate} />)
      )}
      {/* 로딩 트리거 */}
      <div ref={loadMoreRef} className='h-10' />
      {isValidating && <Txt className='py-2 text-center'>불러오는 중...</Txt>}
    </div>
  );
}
