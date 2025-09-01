import { Header } from '@/components/common';
import {
  CancelBtn,
  GuestInfoCard,
  HostInfoCard,
  StayInfoCard,
} from '@/components/domain/reservations';
import { dummyReservationDetail } from '../../../../public/dummy';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReservationDetailPage({ params }: Props) {
  const { id } = await params;

  const {
    stayPicURL,
    stayId,
    stayName,
    stayAddress,
    guestName,
    schedule,
    peopleCount,
    doWork,
    guestTel,
    hostName,
    hostTel,
  } = dummyReservationDetail;

  return (
    <div className='flex flex-col gap-4'>
      <Header title='예약 자세히 보기' />

      <main className='flex flex-col gap-9 px-5'>
        <StayInfoCard data={{ stayPicURL, stayId, title: stayName, address: stayAddress }} />
        <GuestInfoCard data={{ guestName, schedule, peopleCount, doWork, guestTel }} />
        <HostInfoCard data={{ hostName, hostTel }} />
        <CancelBtn id={id} />
      </main>
    </div>
  );
}
