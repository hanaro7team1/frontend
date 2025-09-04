import { publicApi } from '@/lib/axios';
import { StayListResponse, StaysSearchParams } from '@/types/stays';
import { RoomItem } from '.';

type Props = {
  searchParams: StaysSearchParams;
};

export default async function RoomList({ searchParams }: Props) {
  const { data } = await publicApi<StayListResponse>('/api/stays', { params: searchParams });

  return (
    <div className='m-4 space-y-4'>
      {data.dtoList.map((room) => (
        <RoomItem key={room.id} data={room} searchParams={searchParams} />
      ))}
    </div>
  );
}
