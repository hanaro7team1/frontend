'use client'

import { usePublicData } from "@/hooks/api/useApi";
import ListBox from "./ListBox";
import { FestivalListResponse } from "@/types/festivals";

type Props = {
    firstList: FestivalListResponse;
};

export default function FestivalList({ firstList }: Props) {
    const { data } = usePublicData<FestivalListResponse>('/api/festivals');

    return <>
        <div className='flex flex-col gap-8 p-5 pb-25'>
            {data?.dtoList.map((festival) => (
                <ListBox key={festival.id} data={festival} />
            ))}
        </div>
    </>;
}