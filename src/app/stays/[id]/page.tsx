import { serverPrivateApi } from '@/lib/axios-server';
import { Txt } from '@/components/atoms';
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
    params: { schedule: searchParam.schedule },
  });

  const {
    id,
    title,
    stayResrvStatus,
    address,
    capacity,
    areaSize,
    images,
    description,
    isDeleted,
  } = data;

  const isAdmin = await getIsAdmin();
  const mode = isAdmin ? 'countryside' : 'city';

  return (
    <div className='flex flex-col'>
      <header>
        <Header title='사랑방 자세히 보기' />

        {isDeleted && (
          <div className='bg-gray-6d6 flex justify-center py-2'>
            <Txt>* 삭제된 사랑방입니다 *</Txt>
          </div>
        )}
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
        {!isDeleted && (
          <StayActionBar
            id={id}
            mode={mode}
            schedule={searchParam.schedule}
            peopleCount={searchParam.peopleCount}
            capacity={capacity}
          />
        )}
      </footer>
    </div>
  );
}
