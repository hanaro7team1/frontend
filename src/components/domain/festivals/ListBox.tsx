'use client'

import { Button, Txt } from "@/components/atoms";
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
            <Image src={img} alt="축제" width={150} height={150} className="rounded-[8px] shrink-0"/>
            <div className="flex flex-col">
                <Txt size={20}>{title}</Txt>
                <Txt size={18}>{startDate} ~ {endDate}</Txt>
                <Txt size={15}>{city}</Txt>
                <Button title="상세보기" className="h-[35px] bg-gray-6d6 text-black" onClick={() => router.push(`${url}`)}/>
            </div>
        </div>
    </>;
}