'use client';

import type { Address } from 'react-daum-postcode';
import dynamic from 'next/dynamic';
import Txt from '@/components/atoms/Text';
import GifLoader from '@/components/common/GifLoaders';

//SSR 단계에서 window에 의존하는 임베드 충돌 방지
const DaumPostcodeEmbed = dynamic(
  () => import('react-daum-postcode').then((mod) => mod.DaumPostcodeEmbed),
  { loading: () => <GifLoader path='/loaders/spin.gif' size={70} /> },
);

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (payload: { address: string; type: 'R' | 'J'; raw: Address }) => void;
};

export default function AddressSearchModal({ open, onClose, onSelect }: Props) {
  if (!open) return null;

  const handleComplete = (data: Address) => {
    // 기본 주소 + (건물명) 조합
    const base = data.address;
    const extra = data.addressType === 'R' && data.buildingName ? ` (${data.buildingName})` : '';
    const composed = base + extra;

    onSelect({
      address: composed,
      type: data.addressType as 'R' | 'J',
      raw: data,
    });
    onClose();
  };

  return (
    <div>
      <div
        className='bg-black-626/40 fixed inset-0 left-1/2 z-100 w-full -translate-x-1/2 sm:w-sm'
        onClick={onClose}
      />
      <div className='fixed top-24 left-1/2 z-[100] w-full -translate-x-1/2 p-2 sm:w-sm'>
        <header className='border-black-626/15 sticky top-0 z-50 flex h-[50px] w-full items-center border-b bg-gray-200 px-2'>
          <Txt size={24} align='center' className='flex-1'>
            주소 찾기
          </Txt>
        </header>
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
