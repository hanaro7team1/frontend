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
                <Txt>{title}</Txt>
                <Txt>{startDate} ~ {endDate}</Txt>
                <Txt>{city}</Txt>
                <Button title="상세보기" color="gray" className="h-[35px]" onClick={() => router.push(`${url}`)}/>
            </div>
        </div>
    </>;
}