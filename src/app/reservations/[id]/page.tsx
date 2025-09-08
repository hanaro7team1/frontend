import { serverPrivateApi } from '@/lib/axios-server';
import { Txt } from '@/components/atoms';
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
    imageUrl,
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
    resrvStatus,
  } = data;

  const isFinished = new Date(startDate) < new Date();
  const isCancelled = resrvStatus === 'CANCELLED';

  const isAdmin = await getIsAdmin();

  return (
    <div className='flex flex-col gap-4'>
      <div>
        <Header title='예약 자세히 보기' />
        {isCancelled && (
          <div className='bg-gray-6d6 flex justify-center py-2'>
            <Txt>* 취소된 예약입니다 *</Txt>
          </div>
        )}
      </div>

      <main className='flex flex-col gap-9 px-5'>
        <StayInfoCard data={{ imageUrl, stayId, title, address }} />
        <GuestInfoCard data={{ memberName, startDate, endDate, personCnt, isFarm, memberPhone }} />
        {isHomestay && <HostInfoCard data={{ ownerName, ownerPhone }} />}
        {!isAdmin && !isCancelled && !isFinished && <CancelBtn id={id} />}
      </main>
    </div>
  );
}
