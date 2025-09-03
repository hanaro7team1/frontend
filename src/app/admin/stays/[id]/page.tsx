import { publicApi } from '@/lib/axios';
import { serverPrivateApi } from '@/lib/axios-server';
import { Header } from '@/components/common';
import { EditStay } from '@/components/domain/admin/edit';
import { StayInfoCard } from '@/components/domain/reservations';
import { StayDetailResponseType } from '@/types/stays';
import { stayDetail } from '../../../../../public/dummy';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminStayEditPage({ params }: Props) {
  const { id: stayId } = await params;

  const api = await serverPrivateApi();
  const { data } = await api.get<StayDetailResponseType>(`/stays/${stayId}`);
  console.log('🚀 ~ AdminStayEditPage ~ data:', data);
  const { id, title, address, capacity, areaSize, description } = data;

  return (
    <div className='flex flex-col gap-4'>
      <Header title='사랑방 정보 수정하기' />

      <main className='flex flex-col gap-10 px-5'>
        <StayInfoCard data={{ stayPicURL: '/images/sample1.png', id, title, address }} isAdmin />
        <EditStay data={{ areaSize, capacity, description }} />
      </main>
    </div>
  );
}
