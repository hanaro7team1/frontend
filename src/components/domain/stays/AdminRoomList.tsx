import { serverPrivateApi } from '@/lib/axios-server';
import { AdminStayListResponse, AdminStaysSearchParams } from '@/types/stays';
import { AdminRoomItem } from '.';

type Props = {
  searchParams: AdminStaysSearchParams;
};

export default async function AdminRoomList({ searchParams }: Props) {
  const api = await serverPrivateApi();
  const { data } = await api.get<AdminStayListResponse>('/api/admin/stays', {
    params: searchParams,
  });

  return (
    <div className='m-4 space-y-4'>
      {data.dtoList.map((room) => (
        <AdminRoomItem key={room.id} data={room} />
      ))}
    </div>
  );
}
