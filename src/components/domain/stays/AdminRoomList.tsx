import { serverPrivateApi } from '@/lib/axios-server';
import { EmptyState } from '@/components/common';
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
      {!data.dtoList.length ? (
        <EmptyState>
          조건에 맞는 사랑방이 없어요
          <br /> 다른 조건으로 찾아 보세요
        </EmptyState>
      ) : (
        data.dtoList.map((room) => <AdminRoomItem key={room.id} data={room} />)
      )}
    </div>
  );
}
