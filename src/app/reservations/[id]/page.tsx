import { serverPrivateApi } from '@/lib/axios-server';
import { Header } from '@/components/common';
import {
  CancelBtn,
  GuestInfoCard,
  HostInfoCard,
  StayInfoCard,
} from '@/components/domain/reservations';
import { getIsAdmin } from '@/utils/auth/auth-server';
import { ReservationDetail } from '@/types/reservation';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReservationDetailPage({ params }: Props) {
  const { id } = await params;

  const api = await serverPrivateApi();
  const { data } = await api.get<ReservationDetail>(`/api/reservations/${id}`);

  const {
    address,
    endDate,
    isFarm,
    isHomestay,
    memberName,
    memberPhone,
    ownerName,
    ownerPhone,
    personCnt,
    startDate,
    stayId,
    title,
  } = data;

  const isAdmin = await getIsAdmin();

  return (
    <div className='flex flex-col gap-4'>
      <Header title='예약 자세히 보기' />

      <main className='flex flex-col gap-9 px-5'>
        <StayInfoCard data={{ stayPicURL: '/images/sample1.png', stayId, title, address }} />
        <GuestInfoCard data={{ memberName, startDate, endDate, personCnt, isFarm, memberPhone }} />
        {isHomestay && <HostInfoCard data={{ ownerName, ownerPhone }} />}
        {!isAdmin && <CancelBtn id={id} />}
      </main>
    </div>
  );
}
