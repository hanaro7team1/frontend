import { Txt } from "@/components/atoms";
import { BottomTabNav, Header } from "@/components/common";
import Image from "next/image";
import { CalendarCheck, HandCoinsIcon, Link, MapPinned } from 'lucide-react';
import { dDayCal } from "@/utils/festivals/dateCal";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FestivalDetailPage({ params }: Props) {
  const { id } = await params;
  const commonPosision = "flex items-center gap-2";

  const smapleData = {
    dataId: 1,
    title: "신정호 별빛축제",
    startDate: "2025-09-10",
    endDate: "2025-10-20",
    describtion: "<신정호 별빛축제>는 한여름 밤의 더위를 피해 신정호에서 펼쳐지는 축제이다. 1998년 별빛 특선 영화제, 신정호 토요문화 한마당에서 시작 되었으며 2007년 한여름밤의 신정호 별빛축제로 명칭이 변경되어 개최해오고 있다. 지역 예술인 공연, 영화 상영, 별자리 관측 등이 진행된다.",
    addr: "충청남도 아산시 신정로 616 (방축동)",
    price: 0,
    url: "주소"
  }
  const {dataId, title, startDate, endDate, describtion, addr, price, url} = smapleData;
  
  const dateFormat = (s: string) => `${s.slice(0,4)}.${s.slice(5,7)}.${s.slice(8,10)}`;

  const dDay = (d: string) => {
    const n = dDayCal(d);
    if(!Number.isFinite(n)) return '';
    
    return n > 0 ? `D-${n}` : n === 0 ? 'D-Day' : `D+${Math.abs(n)}`;
};

  return <div>
    <Header title="축제 자세히 보기" bgColor="white" />
    <div className="relative w-full h-[320px] shrink-0 overflow-hidden">
      <Image src='/images/dummy_image.png' alt={title} fill className="object-cover"/>
    </div>
    <div className="p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Txt size={24} weight="bold">{title}</Txt>
          <div className="inline-flex items-center w-fit rounded-[8px] bg-gray-6d6 px-3">
            <Txt size={22} className="text-green-49d ">{dDay(startDate)}</Txt>
          </div>
        </div>

        <div className={`${commonPosision}`}>
          <CalendarCheck color="var(--code-theme1)" size={25}/>
          <Txt size={24}>{dateFormat(startDate)} ~ {dateFormat(endDate)}</Txt>
        </div>

        <div>
          <Txt size={20}className="text-gray-070">{describtion}</Txt>
        </div>

        <div className={`${commonPosision}`}>
          <MapPinned color="var(--code-theme1)" size={25}/>
          <Txt>{addr}</Txt>
        </div>
        
        <div className={`${commonPosision}`}>
          <HandCoinsIcon color="var(--code-theme1)" size={25}/>
          <Txt>{price === 0 ? '무료' : `${price} 원`}</Txt>
        </div>

        <div className={`${commonPosision}`}>
          <Link color="var(--code-theme1)" size={25}/>
          <Txt>{url}</Txt>
        </div>
    </div>
  
    <BottomTabNav />
  </div>;
}
