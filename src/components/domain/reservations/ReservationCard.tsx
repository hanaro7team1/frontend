'use client'

import { Button, ShadowBox, Txt } from "@/components/atoms";
import { StatusCapsule } from "../stays";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { dateweekFormat } from "@/utils/reservations/dateCal";
import { ReservationsListResponse } from "@/types/reservation";

type Props = {
    data:ReservationsListResponse;
};
type Status = '방문 중' | '방문 전' | '방문 완료' | '예약 취소';

export default function ReservationCard({data}:Props) {
    const {id, title, resrvStatus, visitStatus, dDay, startDate, endDate, imgUrl} = data;
    const router = useRouter();

    let statusBox: Status = '방문 전';
    let message = '';
    if(resrvStatus === 'CANCELLED') {
        statusBox = '예약 취소';
        message = '예약을 취소했어요';
    }
    if(resrvStatus === 'RESERVED') {
        const map = {
            UPCOMING:   { status: '방문 전'  as Status, message: `${dDay}일 후 방문해요` },
            IN_PROGRESS:{ status: '방문 중'  as Status, message: '지금 머무르고 있어요' },
            COMPLETED:  { status: '방문 완료' as Status, message: '방문을 마쳤어요' },
        } as const;

        const v = map[visitStatus];
        statusBox = v.status;
        message = v.message;
    }

    return <>
        <ShadowBox className="p-3 gap-4">
            <div className="flex items-center gap-3">
                <StatusCapsule status={statusBox} />
                <Txt size={22} weight="bold">{message}</Txt>
            </div>
            <div role="separator" className="h-px w-full bg-gray-6d6"/>
            <div className="flex flex-col gap-2">
                <div className="relative w-full h-[113px] rounded-[8px] shrink-0 overflow-hidden">
                    <Image src={imgUrl} alt={title} fill className="object-cover"/>
                </div>
                <Txt size={22}>{title}</Txt>
                <Txt size={18}>{dateweekFormat(startDate)} ~ {dateweekFormat(endDate)}</Txt>
            </div>
            <Button color="gray" title="예약 자세히 보기" onClick={() => router.push(`/reservations/${id}`)}/>
        </ShadowBox>
    </>;
}