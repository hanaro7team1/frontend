import { publicApi } from '@/lib/axios';
import { Carousel, Header } from '@/components/common';
import { BottomButton, EstateDescription, EstateHeader } from '@/components/domain/realEstates';
import { StayInfoChips } from '@/components/domain/stays';
import { EstatesItemResponse } from '@/types/real-estates';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RealEstateDetailPage({ params }: Props) {
  const { id: estateId } = await params;
  const { data } = await publicApi.get<EstatesItemResponse>(`/api/real-estates/${estateId}`);

  const {
    location,
    price,
    tradeType,
    imageUrls,
    capacity,
    area,
    description,
    areaSize,
    roomCount,
    house,
  } = data;

  return (
    <div className='flex flex-col'>
      <header>
        <Header title='매물 자세히 보기' />
      </header>

      <main className='flex-1'>
        <Carousel images={imageUrls || '/images/sample1.png'} />

        <div className='mt-8 space-y-5 p-5'>
          <EstateHeader tradeType={tradeType} price={price} location={location} />
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
