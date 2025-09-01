'use client'

import { Button, Txt } from "@/components/atoms";
import { useRouter } from "next/navigation";

type Props = {
    open: boolean;
    text?: string;
};

export default function NoticeModal({open, text}: Props) {
    const router = useRouter();
    if(!open){ return null;}
    
    const message = `${text}가 변경되었어요`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full mx-4 h-[193px] shrink-0 rounded-[10px]
                    border border-[#DEDEDE] bg-white p-5 shadow-md
                    flex flex-col items-center justify-between">
                <Txt size={26} className="text-center">{message}</Txt>
                <Button title="확인" color="pink" className="w-[337px] h-[56px]"
                    onClick={() => router.back()}/>
            </div>
        </div>
    );
}
