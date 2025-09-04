import { publicApi } from '@/lib/axios';
import { serverPrivateApi } from '@/lib/axios-server';
import { Header } from '@/components/common';
import { EditStay } from '@/components/domain/admin/edit';
import { StayInfoCard } from '@/components/domain/reservations';
import { StayDetailResponseType } from '@/types/stays';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminStayEditPage({ params }: Props) {
  const { id } = await params;

  const { data } = await publicApi.get<StayDetailResponseType>(`/api/stays/${id}`);
  const { title, address, capacity, areaSize, description, images, id: stayId } = data;

  return (
    <div className='flex flex-col gap-4'>
      <Header title='사랑방 정보 수정하기' />

      <main className='flex flex-col gap-10 px-5'>
        <StayInfoCard data={{ imageUrl: images[0], stayId, title, address }} isAdmin />
        <EditStay data={{ areaSize, capacity, description, stayId }} />
      </main>
    </div>
  );
}
