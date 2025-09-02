'use client';

import { useMemo } from 'react';
import { Carousel, Header } from '@/components/common';
import { StayDescription, StayInfoChips } from '@/components/domain/stays';
import StayHeader from '@/components/domain/stays/StayHeader';
import { keyToPublicUrl } from '@/utils/stays/stays';
import { useWizardData } from '../../wizard/WizardDataProvider';

export default function StayPreview() {
  const { data } = useWizardData();

  // 전역 Wizard 데이터에서 필요한 값 모으기
  const stay = useMemo(() => {
    const address = data?.step1?.address ?? '주소 미정';
    const detailAddress = data?.step1?.detailAddress ?? '상세 주소 미정';
    const capacity = data?.step3?.capacity ?? 0;
    const areaSize = data?.step3?.areaSize ?? 0;
    const description = data?.step5?.description ?? '';
    const s3Keys: string[] = data?.step2?.s3Keys ?? [];

    const images =
      s3Keys.length > 0
        ? s3Keys.map((k) => keyToPublicUrl(k))
        : ['/images/sample1.png', '/images/sample2.png']; // fallback

    return {
      address,
      detailAddress,
      capacity,
      areaSize,
      description,
      images,
    };
  }, [data]);

  return (
    <div className='flex flex-col'>
      <header>
        <Header title='미리 보기' />
      </header>

      <main className='flex-1'>
        <Carousel images={stay.images} />

        <div className='mt-8 space-y-5 p-5'>
          <StayHeader title={'사랑방'} address={stay.address} />
          <StayInfoChips capacity={stay.capacity} area={stay.areaSize} />
          <StayDescription item={stay.description} />
        </div>
      </main>
    </div>
  );
}
