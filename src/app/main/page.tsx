import Image from 'next/image';
import { serverPrivateApi } from '@/lib/axios-server';
import { Txt } from '@/components/atoms';
import { BottomActions, BottomTabNav } from '@/components/common';
import { LoanCard, ReservationBtn, UpcommingStayCard } from '@/components/domain/main';
import { UserReservationResponse } from '@/types/user';

export default async function HomePage() {
  const api = await serverPrivateApi();
  const { data } = await api.get<UserReservationResponse>('/api/reservations/next');

  const { reservationId, memberName, imageUrl, title, viewStatus, startDate, endDate, dDay } = data;

  return (
    <div className='relative flex flex-col'>
      <div className='from-green-49d/13 absolute top-0 z-0 h-49 w-full bg-gradient-to-b to-white' />
      <header className='z-1 flex items-center justify-center'>
        <Image src='/images/Img_SIDO_LOGO.png' alt='시도 로고' width={86} height={86} />
        <Txt size={22} weight='medium'>
          하는 {memberName} 님, 환영합니다
        </Txt>
      </header>

      <main className='z-1 space-y-5 px-4'>
        <UpcommingStayCard
          reservationId={reservationId}
          title={title}
          startDate={startDate}
          endDate={endDate}
          imgUrl={imageUrl}
          viewStatus={viewStatus}
          dDay={dDay}
        />
        <ReservationBtn />
        <LoanCard />
      </main>

      <footer>
        <BottomActions />
        <BottomTabNav />
      </footer>
    </div>
  );
}
