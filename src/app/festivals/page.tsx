import { Txt } from '@/components/atoms';
import { BottomTabNav, Header } from '@/components/common';
import ListBox from '@/components/domain/festivals/ListBox';
import Image from 'next/image';

export default function FestivalsPage() {
  // db
  const smapleFestival = {
    img:"/images/dummy_image.png",
    title: "신정호 별빛축제",
    startDate:"2025.09.01",
    endDate:"2025.09.10",
    city:"충청남도 아산시",
    url:"https://github.com/hanaro7team1/frontend"
  }
  const {img, title, startDate, endDate, city, url} = smapleFestival;

  

  return <>
    <Header title='지역 축제' bgColor='green'/>

    <div className='p-4'>
      <div className='relative rounded-[10px] flex justify-end 
                    border border-[#A6DEDC] bg-green-2f1
                    items-center'>  
          <Image src="/images/Img_Festival.svg" alt='쇼핑' width={107} height={107} className='absolute left-0' />
          <Txt size={24} weight='medium' className='text-center mr-15'>즐거운 지역축제<br />함께 시도해요!</Txt>
      </div>
    </div>

    <div className='flex flex-col p-6'>
      <ListBox img={img} title={title} startDate={startDate} endDate={endDate} city={city} url={url} />

    </div>

    <BottomTabNav />
  </>;
}
