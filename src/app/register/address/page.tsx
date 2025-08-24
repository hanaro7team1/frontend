'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Input, Txt } from '@/components/atoms';
import { FixedBottomButton } from '@/components/common';
import AddressSearchModal from '@/components/domain/register/AdressSearchModal';

export default function AddressPage() {
  const router = useRouter();

  //addr (주소) zip (우편번호)
  //주소 + 상세 주소 + 우편 번호 -> DB로 넘겨 주기
  const [addr, setAddr] = useState('');
  const [zip, setZip] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col gap-4 p-4'>
      <Txt className='text-left'>사랑방의 주소를 찾아 주세요</Txt>
      <div className='mb-4 flex gap-2'>
        <Input placeholder={'우측 버튼을 누르고 주소를 찾아 주세요'} value={addr} readOnly />
        <Button
          title={''}
          icon={<Search size={16} />}
          onClick={() => setOpen(true)}
          className='border-black-626/20 w-auto border bg-white px-3'
        />
      </div>
      <Txt className='text-left'>사랑방의 상세 주소를 입력해 주세요</Txt>
      <Input placeholder={'상세 주소를 직접 입력하세요'} />
      <FixedBottomButton
        greenBtnText='다음'
        grayBtnText='취소'
        onClickGreenBtn={() => router.push('/register/capacity')}
      />
      <AddressSearchModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={({ address, zip }) => {
          setAddr(address);
          setZip(zip);
        }}
      />
    </div>
  );
}
