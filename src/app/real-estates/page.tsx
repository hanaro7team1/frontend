import { publicApi } from '@/lib/axios';
import { BottomTabNav, Header } from '@/components/common';
import { EstatesList, FilterEstatesOptions } from '@/components/domain/realEstates';
import { EstatesListResponse, RealEstatesSearchParams } from '@/types/real-estates';

type Props = {
  searchParams: Promise<RealEstatesSearchParams>;
};

export default async function RealEstatesPage({ searchParams }: Props) {
  const searchParam = await searchParams;

  const { data } = await publicApi.get<EstatesListResponse>('/api/real-estates', {
    params: searchParam,
  });

  return (
    <>
      <Header title='매물 찾기' bgColor='green' />
      <FilterEstatesOptions />
      <EstatesList initialData={data} searchParams={searchParam} />
      <BottomTabNav />
    </>
  );
}
