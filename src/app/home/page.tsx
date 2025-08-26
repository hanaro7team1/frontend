import Image from 'next/image';
import { Txt } from '@/components/atoms';
import { BottomTabNav } from '@/components/common';
import { LoanCard, ReservationBtn, UpcommingStayCard } from '@/components/domain/home';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function HomePage({ params }: Props) {
  // TODO: 실제 API 연동 → getReservation(reservationId)
  const { id: reservationId } = await params;

  const reservation = {
    id: reservationId,
    name: '가람마을 사랑방 4호',
    dateRange: '25.09.09 (화) - 25.09.13 (토)',
    imgUrl: '/images/sample2.png',
  };

  const { name, dateRange, imgUrl } = reservation;

  return (
    <div className='relative flex flex-col'>
      <div className='from-green-49d/13 absolute top-0 z-0 h-49 w-full bg-gradient-to-b to-white' />
      <header className='z-1 flex items-center justify-center'>
        <Image src='/images/Img_SIDO_LOGO.png' alt='시도 로고' width={86} height={86} />
        <Txt size={22} weight='medium' align='left'>
          하는 윤서연 님, 환영합니다
        </Txt>
      </header>

      <main className='z-1 space-y-5 px-4'>
        <UpcommingStayCard id={reservationId} name={name} dateRange={dateRange} imgUrl={imgUrl} />
        <ReservationBtn />
        <LoanCard />
      </main>

      <footer>
        <BottomTabNav />
      </footer>
    </div>
  );
}
