import { BottomTabNav, Header } from '@/components/common';
import { EstatesList, FilterEstatesOptions } from '@/components/domain/realEstates';

type Props = {
  searchParams: Promise<RealEstatesSearchParams>;
};

export default async function RealEstatesPage({ searchParams }: Props) {
  const searchParam = await searchParams;

  return (
    <>
      <Header title='매물 찾기' bgColor='green' />
      <FilterEstatesOptions />
      <EstatesList searchParams={searchParam} />
      <BottomTabNav />
    </>
  );
}
