import { Header } from '@/components/common';
import { EditStay } from '@/components/domain/admin/edit';
import { StayInfoCard } from '@/components/domain/reservations';
import { stayDetail } from '../../../../../public/dummy';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminStayEditPage({ params }: Props) {
  const { id } = await params;

  const { stayPicURL, stayId, stayName, stayAddress, capacity, area, description } = stayDetail;

  return (
    <div className='flex flex-col gap-4'>
      <Header title='사랑방 정보 수정하기' />

      <main className='flex flex-col gap-10 px-5'>
        <StayInfoCard
          data={{ stayPicURL, stayId, title: stayName, address: stayAddress }}
          isAdmin
        />
        <EditStay data={{ area, capacity, description }} />
      </main>
    </div>
  );
}
