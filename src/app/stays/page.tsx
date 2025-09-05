import { BottomTabNav, Header } from '@/components/common';
import { FilterRoomType, FilterStayOptions, RoomList } from '@/components/domain/stays';
import { getIsAdmin } from '@/utils/auth/auth-server';
import { StaysSearchParams } from '@/types/stays';

type Props = {
  searchParams: Promise<StaysSearchParams>;
};

export default async function StaysPage({ searchParams }: Props) {
  const searchParam = await searchParams;
  const isAdmin = await getIsAdmin();

  return (
    <>
      <Header title='사랑방 찾기' bgColor={isAdmin ? 'white' : 'green'} />
      <FilterRoomType searchParams={searchParam} isAdmin={isAdmin} />
      <FilterStayOptions />
      <RoomList searchParams={searchParam} />
      {!isAdmin && <BottomTabNav />}
    </>
  );
}
