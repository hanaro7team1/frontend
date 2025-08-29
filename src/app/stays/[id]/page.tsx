import { Carousel, Header } from '@/components/common';
import {
  StayActionBar,
  StayDescription,
  StayHeader,
  StayInfoChips,
} from '@/components/domain/stays';
import { getStay } from '@/app/apis/stay-detail';
import { StaysSearchParams } from '@/types/stays';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<StaysSearchParams>;
};

export default async function StayDetailPage({ params, searchParams }: Props) {
  const { id: stayId } = await params;
  const searchParam = await searchParams;
  const stay = await getStay(stayId);

  // const stay = {
  //   id: stayId,
  //   title: '새꽃마을 사랑방 1호',
  //   address: '전남 해남 화산면 율동리 00마을',
  //   images: ['/images/sample1.png', '/images/sample2.png'],
  //   capacity: 4,
  //   area: 24,
  //   description:
  //     '전기가 아닌 진짜 온돌집 집근처에 맹꽁이가 아름답게 울음 옆집 토마토밭 체험 가능 전기가 아닌 진짜 온돌집 집근처에 맹꽁이가 아름답게 울음 옆집 토마토밭 체험 가능 옆집 토마토밭 체험 가능 옆집 토마토밭 체험 가능',
  // };

  // TODO: 실제 사진 연동
  const dummyImages = { images: ['/images/sample1.png', '/images/sample2.png'] };
  const { id, title, address, capacity, areaSize, description } = stay;

  // TODO: 실제 로그인 사용자에 따라 mode 분기
  const mode: 'city' | 'countryside' = 'city';

  return (
    <div className='flex flex-col'>
      <header>
        <Header title='사랑방 자세히 보기' />
      </header>

      <main className='flex-1'>
        <Carousel images={dummyImages.images} />

        <div className='mt-8 space-y-5 p-5'>
          <StayHeader title={title} address={address} />
          <StayInfoChips capacity={capacity} area={areaSize} />
          <StayDescription item={description} mode={mode} />
        </div>
      </main>

      <footer>
        <StayActionBar
          id={id}
          mode={mode}
          schedule={searchParam.schedule}
          peopleCount={searchParam.peopleCount}
        />
      </footer>
    </div>
  );
}
