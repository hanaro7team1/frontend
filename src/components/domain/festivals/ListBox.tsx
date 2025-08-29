'use client'

import { Txt } from "@/components/atoms";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
    img:string,
    title:string,
    startDate:string,
    endDate:string,
    city:string,
    url:string
}

export default function ListBox({img, title, startDate, endDate, city, url}:Props) {
    const router = useRouter();

    return <>
        <div className="flex gap-2">
            <Image src={img} alt="축제" width={154} height={154} className="rounded-[8px]"/>
            <div className="flex flex-col">
                <Txt size={20}>{title}</Txt>
                <Txt size={20}>{startDate} ~ {endDate}</Txt>
                <Txt size={15}>{city}</Txt>
                <button title="상세보기" className="w-[195px] h-[35px]"onClick={() => router.push(`${url}`)}/>
            </div>
        </div>
    </>;
}