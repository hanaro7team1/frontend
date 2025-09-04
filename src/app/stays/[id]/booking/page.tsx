import { serverPrivateApi } from '@/lib/axios-server';
import { Header } from '@/components/common';
import { StayInfoCard } from '@/components/domain/reservations';
import { EditBooking } from '@/components/domain/stays';
import { StayDetailResponseType } from '@/types/stays';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ schedule: string; peopleCount: string }>;
};

export default async function StayBookingPage({ params, searchParams }: Props) {
  const { schedule, peopleCount } = await searchParams;

  const { id } = await params;

  const api = await serverPrivateApi();

  const { data } = await api.get<StayDetailResponseType>(`/api/stays/${id}`);
  const { title, address, images, id: stayId } = data;

  return (
    <div className='flex flex-col gap-4'>
      <Header title='사랑방 예약하기' />

      <main className='flex flex-col gap-10 px-5'>
        <StayInfoCard data={{ imageUrl: images[0], stayId, title, address }} isAdmin />
        <EditBooking data={{ stayId, schedule, peopleCount }} />
      </main>
    </div>
  );
}
