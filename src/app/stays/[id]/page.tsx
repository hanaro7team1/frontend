import Button from '@/components/atoms/Button';
import Txt from '@/components/atoms/Text';
import { Header } from '@/components/common';
import Carousel from '@/components/common/Carousel';
import StayActionBar from '@/components/domain/stays/StayActionBar';
import StayDescription from '@/components/domain/stays/StayDescription';
import StayHeader from '@/components/domain/stays/StayHeader';
import StayInfoChips from '@/components/domain/stays/StayInfoChips';

export default function StayDetailPage({ params }: { params: { id: string } }) {
  // TODO: 실제 API 연동 → getStay(stayId)
  const stayId = params.id;

  const stay = {
    id: stayId,
    title: '새꽃마을 사랑방 1호',
    address: '전남 해남 화산면 율동리 00마을',
    images: ['/images/sample1.png', '/images/sample2.png'],
    capacity: 4,
    area: 24,
    description: [
      '전기가 아닌 진짜 온돌집',
      '집근처에 맹꽁이가 아름답게 울음',
      '옆집 토마토밭 체험 가능',
      '전기가 아닌 진짜 온돌집',
      '집근처에 맹꽁이가 아름답게 울음',
      '옆집 토마토밭 체험 가능',
      '옆집 토마토밭 체험 가능',
      '옆집 토마토밭 체험 가능',
    ],
  };

  // TODO: 실제 로그인 사용자에 따라 mode 분기
  const mode: 'city' | 'countryside' = 'city';

  return (
    <div className='flex flex-col'>
      <header className='shrink-0'>
        <Header title='사랑방 자세히 보기' />
      </header>

      <main className='flex-1'>
        <Carousel images={stay.images} />

        <div className='mt-8 space-y-5 p-5'>
          <StayHeader title={stay.title} address={stay.address} />
          <StayInfoChips capacity={stay.capacity} area={stay.area} />
          <StayDescription items={stay.description} mode={mode} />
        </div>
      </main>

      <footer className='shrink-0'>
        <StayActionBar mode={mode} />
      </footer>
    </div>
  );
}
