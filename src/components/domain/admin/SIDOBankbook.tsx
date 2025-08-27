'use client';

import { useRouter } from 'next/navigation';
import { Button, ShadowBox, Txt } from '@/components/atoms';

type Props = {
  accountName: string; // 계좌 이름
  accountNumber: string; // 계좌 번호
  balance: string; // 계좌 잔액
};

export default function Bankbook({ accountName, accountNumber, balance }: Props) {
  const router = useRouter();
  return (
    <ShadowBox className='bg-white p-4'>
      <div className='flex items-center gap-4'>
        <Txt size={22} className='text-black-444'>
          {accountName}
        </Txt>
        <Txt size={18} className='text-gray-070'>
          {accountNumber}
        </Txt>
      </div>
      <Txt size={30} weight='bold' className='mt-3.5 ml-3'>
        {balance}
      </Txt>

      <section className='mt-4.5 flex gap-2'>
        <Button
          title='이체하기'
          color='gray'
          onClick={() => alert('이체하기 버튼 클릭')}
          className='w-full'
        />
        <Button
          title='거래 내역 조회'
          color='green'
          onClick={() => alert('조회 버튼 클릭')}
          className='w-full'
        />
      </section>
    </ShadowBox>
  );
}
