// 'use client'

// import { usePublicData } from "@/hooks/api/useApi";
// import useSWRInfinite from 'swr/infinite'
// import ListBox from "./ListBox";
// import { FestivalListItemResponse, FestivalListResponse } from "@/types/festivals";
// import { useEffect, useMemo, useRef } from "react";

// type Props = {
//     firstList: FestivalListResponse;
// };
// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export default function FestivalList({ firstList }: Props) {
//     // const { data } = usePublicData<FestivalListResponse>('/api/festivals');

//     const { data } = useSWRInfinite( () => `/api/festivals?page=${1 + page}&litSize=5`, fetcher)

//     const getKey = (pageIndex, prevPageData) => {
//         const nextPage = pageIndex + 2;
//         const totalPages = (prevData?.pages ?? firstList.pages) || 1;
//     }

//     return <>
//         <div className='flex flex-col gap-8 p-5 pb-25'>
//             {data?.dtoList.map((festival) => (
//                 <ListBox key={festival.id} data={festival} />
//             ))}
//         </div>
//     </>;
// }

'use client';

import useSWRInfinite from 'swr/infinite';
import { useMemo } from 'react';
import type { FestivalListItemResponse, FestivalListResponse } from '@/types/festivals';
import ListBox from './ListBox';

// 'use client'

// import { usePublicData } from "@/hooks/api/useApi";
// import useSWRInfinite from 'swr/infinite'
// import ListBox from "./ListBox";
// import { FestivalListItemResponse, FestivalListResponse } from "@/types/festivals";
// import { useEffect, useMemo, useRef } from "react";

// type Props = {
//     firstList: FestivalListResponse;
// };
// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export default function FestivalList({ firstList }: Props) {
//     // const { data } = usePublicData<FestivalListResponse>('/api/festivals');

//     const { data } = useSWRInfinite( () => `/api/festivals?page=${1 + page}&litSize=5`, fetcher)

//     const getKey = (pageIndex, prevPageData) => {
//         const nextPage = pageIndex + 2;
//         const totalPages = (prevData?.pages ?? firstList.pages) || 1;
//     }

//     return <>
//         <div className='flex flex-col gap-8 p-5 pb-25'>
//             {data?.dtoList.map((festival) => (
//                 <ListBox key={festival.id} data={festival} />
//             ))}
//         </div>
//     </>;
// }

// 'use client'

// import { usePublicData } from "@/hooks/api/useApi";
// import useSWRInfinite from 'swr/infinite'
// import ListBox from "./ListBox";
// import { FestivalListItemResponse, FestivalListResponse } from "@/types/festivals";
// import { useEffect, useMemo, useRef } from "react";

// type Props = {
//     firstList: FestivalListResponse;
// };
// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export default function FestivalList({ firstList }: Props) {
//     // const { data } = usePublicData<FestivalListResponse>('/api/festivals');

//     const { data } = useSWRInfinite( () => `/api/festivals?page=${1 + page}&litSize=5`, fetcher)

//     const getKey = (pageIndex, prevPageData) => {
//         const nextPage = pageIndex + 2;
//         const totalPages = (prevData?.pages ?? firstList.pages) || 1;
//     }

//     return <>
//         <div className='flex flex-col gap-8 p-5 pb-25'>
//             {data?.dtoList.map((festival) => (
//                 <ListBox key={festival.id} data={festival} />
//             ))}
//         </div>
//     </>;
// }

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8082';

export const apiUrl = (path: string) => (path.startsWith('http') ? path : `${API_BASE}${path}`);

type Props = {
  firstList: FestivalListResponse; // { dtoList: FestivalListItemResponse[], hasNext: boolean }
};
type Page = FestivalListResponse;

// JSON 파싱 fetcher (native fetch 그대로 넘기지 말기)
const fetcher = async (path: string) => {
  const res = await fetch(apiUrl(path), { credentials: 'include' });
  if (!res.ok) {
    console.error('FETCH FAIL', res.status, apiUrl(path)); // 404 디버깅
    throw new Error(String(res.status));
  }
  return res.json();
};

export default function FestivalList({ firstList }: Props) {
  // 0-based 백엔드라고 가정: 클라 첫 호출은 page=1부터
  const { data, error, isValidating, setSize } = useSWRInfinite<Page>(
    (index, prev) => {
      if (index === 0 && !firstList.hasNext) return null; // 0페이지가 마지막이면 중단
      if (prev && !prev.hasNext) return null; // 직전 페이지가 마지막이면 중단
      const page = index + 2; // 0->1, 1->2...
      return `/api/festivals?page=${page}&listSize=5`; // ← litSize 오타 수정
    },
    fetcher,
    { initialSize: 0, revalidateFirstPage: false },
  );

  // 이후 페이지 아이템 합치기
  const moreItems = useMemo(() => data?.flatMap((p) => p.dtoList) ?? [], [data]);
  // 0페이지 + 이후 페이지
  const items: FestivalListItemResponse[] = useMemo(
    () => [...firstList.dtoList, ...moreItems],
    [firstList.dtoList, moreItems],
  );

  // 현재 기준 hasNext
  const hasNext = data && data.length > 0 ? data[data.length - 1].hasNext : firstList.hasNext;

  // 하단 센티널로 자동 로드
  // const sentinelRef = useRef<HTMLDivElement | null>(null);
  // useEffect(() => {
  //   const el = sentinelRef.current;
  //   if (!el) return;
  //   const io = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting && hasNext && !isValidating) {
  //         setSize(s => s + 1);
  //       }
  //     },
  //     { rootMargin: '160px' } // 살짝 미리 로드
  //   );
  //   io.observe(el);
  //   return () => io.disconnect();
  // }, [hasNext, isValidating, setSize]);

  return (
    <div className='flex flex-col gap-8 p-5 pb-25'>
      {items.map((festival) => (
        <ListBox key={festival.id} data={festival} />
      ))}

      {/* <div ref={sentinelRef} className="h-8 text-center text-sm text-gray-500">
        {error ? '불러오기에 실패했어요'
          : isValidating ? '불러오는 중…'
          : hasNext ? '스크롤하여 더 보기'
          : '마지막입니다'}
      </div> */}
    </div>
  );
}
