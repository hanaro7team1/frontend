'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import { Button, Input, Txt } from '@/components/atoms';
import AddressSearchModal from '@/components/domain/add/steps/step1/AdressSearchModal';
import { SearchButton } from './SearchButton';

export default function AddAdress() {
  //주소 -> DB로 넘겨 주기
  const [addr, setAddr] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <>
      <Txt className='text-left'>사랑방의 주소를 찾아 주세요</Txt>
      <div className='mb-10 flex gap-2'>
        <Input placeholder={'우측 버튼을 누르고 주소를 찾아 주세요'} value={addr} readOnly />
        <SearchButton onClick={() => setOpen(true)} />
      </div>
      <Txt className='text-left'>사랑방의 상세 주소를 입력해 주세요</Txt>
      <Input placeholder={'상세 주소를 직접 입력하세요'} />
      <AddressSearchModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={({ address }) => {
          setAddr(address);
        }}
      />
    </>
  );
}
