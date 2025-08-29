import { BottomTabNav, Header } from '@/components/common';
import Image from 'next/image';

export default function FestivalsPage() {
  // const sample = {
  //   title:,

  // };

  return <>
    <Header title='지역 축제' bgColor='green'/>
      
    <div className='flex flex-col p-4'>
      <Image src="/images/Img_Festival.svg" alt='쇼핑' width={100} height={100} />

    </div>

    <div className='flex flex-col p-6'>


    </div>

    <BottomTabNav />
  </>;
}
