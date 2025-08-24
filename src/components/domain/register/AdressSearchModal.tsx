'use client';

import type { Address } from 'react-daum-postcode';
import dynamic from 'next/dynamic';
import { Header } from '@/components/common';
import GifLoader from '@/components/common/GifLoaders';

//SSR 단계에서 window에 의존하는 임베드 충돌 방지
const DaumPostcodeEmbed = dynamic(
  () => import('react-daum-postcode').then((mod) => mod.DaumPostcodeEmbed),
  { loading: () => <GifLoader path='/loaders/spin.gif' /> },
);

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (payload: { zip: string; address: string; type: 'R' | 'J'; raw: Address }) => void;
};

export default function AddressSearchModal({ open, onClose, onSelect }: Props) {
  if (!open) return null;

  const handleComplete = (data: Address) => {
    // 기본 주소 + (건물명) 조합
    const base = data.address;
    const extra = data.addressType === 'R' && data.buildingName ? ` (${data.buildingName})` : '';
    const composed = base + extra;

    onSelect({
      zip: data.zonecode,
      address: composed,
      type: data.addressType as 'R' | 'J',
      raw: data,
    });
    onClose();
  };

  return (
    <div>
      <div className='absolute inset-0 bg-black/40' onClick={onClose} />
      <div className='fixed top-24 left-1/2 z-[100] w-5/6 -translate-x-1/2 sm:w-sm'>
        <Header title={'주소 찾기'}></Header>
        <div className='grid h-[480px] place-items-center bg-white'>
          <DaumPostcodeEmbed
            onComplete={handleComplete}
            autoClose={false}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}
