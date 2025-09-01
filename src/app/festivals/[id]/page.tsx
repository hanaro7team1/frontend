import { Txt } from "@/components/atoms";
import { BottomTabNav, Header } from "@/components/common";
import Image from "next/image";
import { CalendarCheck, HandCoinsIcon, Link, MapPinned } from 'lucide-react';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FestivalDetailPage({ params }: Props) {
  const { id } = await params;
  const commonPosision = "flex items-center gap-2";

  return <div>
    <Header title="축제 자세히 보기" bgColor="white" />
    <Image src='/images/dummy_image.png' alt="축제포스터" width={1000} height={1000}/>
    <div className="p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Txt size={24} className='' >신정호 별빛축제</Txt>
          <div className="inline-flex items-center w-fit rounded-[8px] bg-gray-6d6 px-3">
            <Txt size={22} className="text-green-49d ">D-7</Txt>
          </div>
        </div>

        <div className={`${commonPosision}`}>
          <CalendarCheck color="var(--code-theme1)" size={25}/>
          <Txt size={24}>일정</Txt>
        </div>

        <div>
          <Txt className="text-gray-070" >설명란</Txt>
        </div>

        <div className={`${commonPosision}`}>
          <MapPinned color="var(--code-theme1)" size={20}/>
          <Txt>장소</Txt>
        </div>
        
        <div className={`${commonPosision}`}>
          <HandCoinsIcon color="var(--code-theme1)" size={20}/>
          <Txt>무료</Txt>
        </div>

        <div className={`${commonPosision}`}>
          <Link color="var(--code-theme1)" size={20}/>
          <Txt>주소창</Txt>
        </div>
    </div>
  
    <BottomTabNav />
  </div>;
}

