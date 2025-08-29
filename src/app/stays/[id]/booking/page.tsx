import { Header } from '@/components/common';
import { StayInfoCard } from '@/components/domain/reservations';
import { EditBooking } from '@/components/domain/stays';
import { getStay } from '@/app/apis/stay-detail';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ schedule: string; peopleCount: string }>;
};

export default async function StayBookingPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { schedule, peopleCount } = await searchParams;

  const stay = await getStay(id);

  const { id: stayId, title, address } = stay;
  const stayPicURL = '/images/sample1.png';

  return (
    <div className='flex flex-col gap-4'>
      <Header title='사랑방 예약하기' />

      <main className='flex flex-col gap-10 px-5'>
        <StayInfoCard data={{ stayPicURL, stayId, title, address }} isAdmin />
        <EditBooking data={{ schedule, peopleCount }} />
      </main>
    </div>
  );
}
