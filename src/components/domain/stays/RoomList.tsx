import { publicApi } from '@/lib/axios';
import { EmptyState } from '@/components/common';
import { StayListResponse, StaysSearchParams } from '@/types/stays';
import { RoomItem } from '.';

type Props = {
  searchParams: StaysSearchParams;
};

export default async function RoomList({ searchParams }: Props) {
  const { data } = await publicApi<StayListResponse>('/api/stays', { params: searchParams });

  return (
    <div className='m-4 space-y-4'>
      {!data.dtoList.length ? (
        <EmptyState>
          조건에 맞는 숙소가 없어요
          <br /> 다른 조건으로 찾아 보세요
        </EmptyState>
      ) : (
        data.dtoList.map((room) => (
          <RoomItem key={room.id} data={room} searchParams={searchParams} />
        ))
      )}
    </div>
  );
}
