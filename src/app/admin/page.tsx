import Image from 'next/image';
import { redirect } from 'next/navigation';
import { serverPrivateApi } from '@/lib/axios-server';
import { Txt } from '@/components/atoms';
import {
  Bankbook,
  MenuTabs,
  ReservationListener,
  ReservationStats,
} from '@/components/domain/admin';
import { getIsAdmin } from '@/utils/auth/auth-server';
import { AdminReservationResponse } from '@/types/admin';

export default async function HomePage() {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    redirect('/login');
  }

  const api = await serverPrivateApi();
  const { data } = await api.get<AdminReservationResponse>('/api/admin/reservations/overview');
  const account = {
    accountName: '시도통장',
    accountNumber: '1234-56789-0000',
    balance: '3,000,000원',
  };

  const { accountName, accountNumber, balance } = account;
  const { villageName, upcomingCnt, inProgressCnt, completedCnt } = data;

  return (
    <div className='relative flex flex-col'>
      <div className='from-pink-a76/13 absolute top-0 z-0 h-49 w-full bg-gradient-to-b to-white' />

      <header className='z-1 flex items-center justify-center'>
        <Txt size={22} weight='medium'>
          {villageName}의
        </Txt>
        <Image src='/images/Img_SIDO_LOGO.png' alt='시도 로고' width={86} height={86} />
        <Txt size={22} weight='medium'>
          를 응원합니다
        </Txt>
      </header>

      <main className='z-1 space-y-5 px-4'>
        <Bankbook accountName={accountName} accountNumber={accountNumber} balance={balance} />
        <ReservationStats
          upcomingCnt={upcomingCnt}
          inProgressCnt={inProgressCnt}
          completedCnt={completedCnt}
        />
      </main>

      <footer className='mt-9 px-4'>
        <MenuTabs />
        <ReservationListener />
      </footer>
    </div>
  );
}
