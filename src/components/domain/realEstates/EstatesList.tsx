import { publicApi } from '@/lib/axios';
import { EmptyState } from '@/components/common';
import { EstatesListResponse, RealEstatesSearchParams } from '@/types/real-estates';
import { EstateItem } from '.';

type Props = {
  searchParams: RealEstatesSearchParams;
};

export default async function EstatesList({ searchParams }: Props) {
  const { data } = await publicApi<EstatesListResponse>('/api/real-estates', {
    params: searchParams,
  });

  return (
    <div className='m-4 space-y-4 pb-20'>
      {!data.dtoList.length ? (
        <EmptyState>
          조건에 맞는 매물이 없어요
          <br /> 다른 조건으로 찾아 보세요
        </EmptyState>
      ) : (
        data.dtoList.map((room) => <EstateItem key={room.id} data={room} />)
      )}
    </div>
  );
}
