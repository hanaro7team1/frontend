import { Carousel, Header } from '@/components/common';
import { BottomButton, EstateDescription, EstateHeader } from '@/components/domain/realEstates';
import { StayInfoChips } from '@/components/domain/stays';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RealEstateDetailPage({ params }: Props) {
  // TODO: 실제 API 연동 → getRealEstates(estateId)
  const { id: estateId } = await params;

  const estate = {
    id: estateId,
    address: '전남 해남 화산면 율동리',
    price: '전세 8,000 만원',
    images: ['/images/sample1.png', '/images/sample2.png'],
    capacity: 4,
    area: 24,
    description: '전기가 아닌 진짜 온돌집 집근처에 맹꽁이가 아름답게 울음 대충 집 설명하기...',
    areaSize: 624.8,
    roomCount: 3,
    house: '1층/기왓집',
  };

  const { address, price, images, capacity, area, description, areaSize, roomCount, house } =
    estate;

  return (
    <div className='flex flex-col'>
      <header>
        <Header title='매물 자세히 보기' />
      </header>

      <main className='flex-1'>
        <Carousel images={images} />

        <div className='mt-8 space-y-5 p-5'>
          <EstateHeader price={price} address={address} />
          <StayInfoChips capacity={capacity} area={area} />
          <EstateDescription
            description={description}
            areaSize={areaSize}
            roomCount={roomCount}
            house={house}
          />
        </div>
      </main>

      <footer>
        <BottomButton />
      </footer>
    </div>
  );
}
