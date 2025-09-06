import { serverPrivateApi } from '@/lib/axios-server';
import { Carousel, Header } from '@/components/common';
import {
  StayActionBar,
  StayDescription,
  StayHeader,
  StayInfoChips,
} from '@/components/domain/stays';
import { getIsAdmin } from '@/utils/auth/auth-server';
import { StayDetailResponseType, StaysSearchParams } from '@/types/stays';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<StaysSearchParams>;
};

export default async function StayDetailPage({ params, searchParams }: Props) {
  const { id: stayId } = await params;
  const searchParam = await searchParams;

  const api = await serverPrivateApi();
  const { data } = await api.get<StayDetailResponseType>(`/api/stays/${stayId}`, {
    params: {
      schedule: searchParam.schedule ?? undefined,
    },
  });

  console.log('schedule: ', searchParam.schedule);
  const { id, title, stayResrvStatus, address, capacity, areaSize, images, description } = data;

  const isAdmin = await getIsAdmin();
  const mode = isAdmin ? 'countryside' : 'city';

  return (
    <div className='flex flex-col'>
      <header>
        <Header title='사랑방 자세히 보기' />
      </header>

      <main className='flex-1'>
        <Carousel images={images} />

        <div className='mt-8 space-y-5 p-5'>
          <StayHeader title={title} address={address} stayResrvStatus={stayResrvStatus} />
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
