import { BottomTabNav, Header } from '@/components/common';
import { RoomList, RoomTypeFilter, StayOptionFilters } from '@/components/domain/stays';
import { StaysSearchParams } from '@/types/stays';

type Props = {
  searchParams: Promise<StaysSearchParams>;
};

export default async function StaysPage({ searchParams }: Props) {
  const params = await searchParams;

  const isAdmin = false; // TODO: 추후에 세션에서 관리자 여부 읽어오기

  return (
    <>
      <Header title='사랑방 찾기' bgColor={isAdmin ? 'pink' : 'green'} />
      <RoomTypeFilter searchParams={params} isAdmin={isAdmin} />
      <StayOptionFilters searchParams={params} />
      <RoomList />
      {!isAdmin && <BottomTabNav />}
    </>
  );
}
