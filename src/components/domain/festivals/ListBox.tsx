'use client'

import { Button, Txt } from "@/components/atoms";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
    img: string;
    title: string;
    startDate: string;
    endDate: string;
    city: string;
    url: string;
}

export default function ListBox({img, title, startDate, endDate, city, url}:Props) {
    const router = useRouter();

    return <>
        <div className="flex gap-2 items-center">
            <div className="relative w-[154px] h-[154px] shrink-0 overflow-hidden rounded-[8px]">
                <Image src={img} alt="축제" fill sizes="154px" className="object-cover"/>
            </div>
            <div className="flex flex-col gap-1">
                <Txt>{title}</Txt>
                <Txt size={15}>{startDate} ~ {endDate}</Txt>
                <Txt size={15}>{city}</Txt>
                <Button title="상세보기" color="gray" className="h-[35px] mt-3" onClick={() => router.push(`${url}`)}/>
            </div>
        </div>
    </>;
}
