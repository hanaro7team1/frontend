import { publicApi } from '@/lib/axios';
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
      {data.dtoList.map((room) => (
        <EstateItem key={room.id} data={room} />
      ))}
    </div>
  );
}
