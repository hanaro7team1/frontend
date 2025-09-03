import Image from 'next/image';
import { Txt } from '@/components/atoms';
import { Bankbook, MenuTabs, ReservationStats } from '@/components/domain/admin';
import { ReservationModal } from '@/components/domain/home';
import { ReservationStatus } from '@/enums/reservation';

export default function HomePage() {
  // TODO: 실제 API 연동
  const user = {
    name: '가람마을',
  };

  const account = {
    accountName: '시도통장',
    accountNumber: '1234-56789-0000',
    balance: '3,000,000원',
  };

  const reservationStats = {
    booked: 12,
    staying: 2,
    completed: 32,
  };

  const payload = {
    id: 1,
    confirmedDate: '25.09.09 (화) - 25.09.13 (토)',
    hostName: '김갑순',
    roomName: '가람마을 사랑방 3호',
    status: ReservationStatus.RESERVED,
  };

  const { name } = user;
  const { accountName, accountNumber, balance } = account;
  const { booked, staying, completed } = reservationStats;

  return (
    <div className='relative flex flex-col'>
      <div className='from-pink-a76/13 absolute top-0 z-0 h-49 w-full bg-gradient-to-b to-white' />

      <header className='z-1 flex items-center justify-center'>
        <Txt size={22} weight='medium'>
          {name}의
        </Txt>
        <Image src='/images/Img_SIDO_LOGO.png' alt='시도 로고' width={86} height={86} />
        <Txt size={22} weight='medium'>
          를 응원합니다
        </Txt>
      </header>

      <main className='z-1 space-y-5 px-4'>
        <Bankbook accountName={accountName} accountNumber={accountNumber} balance={balance} />
        <ReservationStats booked={booked} staying={staying} completed={completed} />
      </main>

      <footer className='mt-9 px-4'>
        <MenuTabs />
        <ReservationModal payload={payload} />
      </footer>
    </div>
  );
}
