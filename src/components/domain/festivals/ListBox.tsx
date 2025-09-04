'use client'

import { Button, Txt } from "@/components/atoms";
import { FestivalListItemResponse } from "@/types/festivals";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
    data: FestivalListItemResponse;
};

export default function ListBox({data}:Props) {
    const {id, title, startDate, endDate, city} = data;
    // const {id, img, title, startDate, endDate, city} = data;
    const router = useRouter();

    return <>
        <div className="flex gap-3 items-center">
            <div className="relative w-[154px] h-[154px] shrink-0 overflow-hidden rounded-[8px]">
                <Image src='/loaders/dot.gif' alt={title} fill className="object-cover"/>
                {/* <Image src={img} alt={title} fill className="object-cover"/> */}
            </div>
            <div className="flex flex-col gap-1">
                <Txt>{title}</Txt>
                <Txt size={15}>{city}</Txt>
                <Txt size={18}>{startDate} ~ {endDate}</Txt>
                <Button title="상세보기" color="gray" className="h-[35px] mt-3" onClick={() => router.push(`/festivals/${id}`)}/>
            </div>
        </div>
    </>;
}
