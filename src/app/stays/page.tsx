import { BottomTabNav, Header } from '@/components/common';
import { FilterRoomType, FilterStayOptions, RoomList } from '@/components/domain/stays';
import { StaysSearchParams } from '@/types/stays';

type Props = {
  searchParams: StaysSearchParams;
};

export default async function StaysPage({ searchParams }: Props) {
  const isAdmin = false; // TODO: 추후에 세션에서 관리자 여부 읽어오기

  return (
    <>
      <Header title='사랑방 찾기' bgColor={isAdmin ? 'pink' : 'green'} />
      <FilterRoomType searchParams={searchParams} isAdmin={isAdmin} />
      <FilterStayOptions />
      <RoomList searchParams={searchParams} />
      {!isAdmin && <BottomTabNav />}
    </>
  );
}
