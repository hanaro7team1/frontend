'use client'

import { usePublicData } from "@/hooks/api/useApi";
import useSWRInfinite from 'swr/infinite'
import ListBox from "./ListBox";
import { FestivalListItemResponse, FestivalListResponse } from "@/types/festivals";
import { useEffect, useMemo, useRef } from "react";

type Props = {
    firstList: FestivalListResponse;
};
const getKey = (pageIndex, prevPageData) => {
    
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FestivalList({ firstList }: Props) {
    // const { data } = usePublicData<FestivalListResponse>('/api/festivals');

    const { data } = useSWRInfinite( () => `/api/festivals/&page=${1 + page} `, fetcher)
    
    return <>
        <div className='flex flex-col gap-8 p-5 pb-25'>
            {data?.dtoList.map((festival) => (
                <ListBox key={festival.id} data={festival} />
            ))}
        </div>
    </>;
}