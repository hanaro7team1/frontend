import { BottomTabNav, Header } from '@/components/common';
import { FilterEstatesOptions } from '@/components/domain/realEstates';
import { RoomList } from '@/components/domain/stays';

type Props = {
  searchParams: Promise<RealEstatesSearchParams>;
};

export default async function RealEstatesPage({ searchParams }: Props) {
  const searchParam = await searchParams;
  const isAdmin = false; // TODO: 추후에 세션에서 관리자 여부 읽어오기

  return (
    <div>
      <Header title='매물 찾기' bgColor='green' />
      <FilterEstatesOptions />
      <RoomList searchParams={searchParam} />
      {!isAdmin && <BottomTabNav />}
    </div>
  );
}
