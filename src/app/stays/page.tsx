import { publicApi } from '@/lib/axios';
import { BottomTabNav, Header } from '@/components/common';
import { FilterRoomType, FilterStayOptions, RoomList } from '@/components/domain/stays';
import { getIsAdmin } from '@/utils/auth/auth-server';
import { StayListResponse, StaysSearchParams } from '@/types/stays';

type Props = {
  searchParams: Promise<StaysSearchParams>;
};

export default async function StaysPage({ searchParams }: Props) {
  const searchParam = await searchParams;
  const isAdmin = await getIsAdmin();

  const { data } = await publicApi.get<StayListResponse>('/api/stays', {
    params: searchParam,
  });

  return (
    <>
      <Header title='사랑방 찾기' bgColor={isAdmin ? 'white' : 'green'} withoutBorder />
      <FilterRoomType searchParams={searchParam} isAdmin={isAdmin} />
      <FilterStayOptions />
      <div className={isAdmin ? '' : 'pb-20'}>
        <RoomList initialData={data} searchParams={searchParam} />
      </div>
      {!isAdmin && <BottomTabNav />}
    </>
  );
}
