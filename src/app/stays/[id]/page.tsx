import { Carousel, Header } from '@/components/common';
import {
  StayActionBar,
  StayDescription,
  StayHeader,
  StayInfoChips,
} from '@/components/domain/stays';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function StayDetailPage({ params }: Props) {
  // TODO: 실제 API 연동 → getStay(stayId)
  const { id: stayId } = await params;

  const stay = {
    id: stayId,
    title: '새꽃마을 사랑방 1호',
    address: '전남 해남 화산면 율동리 00마을',
    images: ['/images/sample1.png', '/images/sample2.png'],
    capacity: 4,
    area: 24,
    description:
      '전기가 아닌 진짜 온돌집 집근처에 맹꽁이가 아름답게 울음 옆집 토마토밭 체험 가능 전기가 아닌 진짜 온돌집 집근처에 맹꽁이가 아름답게 울음 옆집 토마토밭 체험 가능 옆집 토마토밭 체험 가능 옆집 토마토밭 체험 가능',
  };

  const { id, title, address, images, capacity, area, description } = stay;

  // TODO: 실제 로그인 사용자에 따라 mode 분기
  const mode: 'city' | 'countryside' = 'city';

  return (
    <div className='flex flex-col'>
      <header>
        <Header title='사랑방 자세히 보기' />
      </header>

      <main className='flex-1'>
        <Carousel images={images} />

        <div className='mt-8 space-y-5 p-5'>
          <StayHeader title={title} address={address} />
          <StayInfoChips capacity={capacity} area={area} />
          <StayDescription item={description} mode={mode} />
        </div>
      </main>

      <footer>
        <StayActionBar id={id} mode={mode} />
      </footer>
    </div>
  );
}

