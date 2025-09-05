'use client'

import { Button, ShadowBox, Txt } from "@/components/atoms";
import { StatusCapsule } from "../stays";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { dateweekFormat } from "@/utils/reservations/dateCal";
import { ReservationsListResponse } from "@/types/reservation";

type Props = {
    data: ReservationsListResponse;
};

export default function ReservationCard({data}:Props) {
    const {reservationId, imageUrl, title, viewStatus, dDay, startDate, endDate} = data;
    const router = useRouter();
        
    const STATUS_MAP = {
        '방문 전':  `${dDay}일 후 방문해요` ,
        '방문 중':  '지금 머무르고 있어요' ,
        '방문 완료': '방문을 마쳤어요' ,
        '예약 취소': '예약을 취소했어요' ,
    } as const;

    const message = STATUS_MAP[viewStatus];

    return <>
        <ShadowBox className="p-3 gap-4">
            <div className="flex items-center gap-3">
                <StatusCapsule status={viewStatus} />
                <Txt size={22} weight="bold">{message}</Txt>
            </div>
            <div role="separator" className="h-px w-full bg-gray-6d6"/>
            <div className="flex flex-col gap-2">
                <div className="relative w-full h-[113px] rounded-[8px] shrink-0 overflow-hidden">
                    <Image src={imageUrl} alt={title} fill className="object-cover"/>
                </div>
                <Txt size={22}>{title}</Txt>
                <Txt size={18}>{dateweekFormat(startDate)} ~ {dateweekFormat(endDate)}</Txt>
            </div>
            <Button color="gray" title="예약 자세히 보기" onClick={() => router.push(`/reservations/${reservationId}`)}/>
        </ShadowBox>
    </>;
}