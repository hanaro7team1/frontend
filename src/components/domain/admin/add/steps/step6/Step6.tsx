'use client';

import router from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { privateApi } from '@/lib/axios-client';
import { Carousel, Header, Modal } from '@/components/common';
import { StayDescription, StayInfoChips } from '@/components/domain/stays';
import StayHeader from '@/components/domain/stays/StayHeader';
import { keyToPublicUrl } from '@/utils/stays/stays';
import { useWizardData } from '../../wizard/WizardDataProvider';
import { useWizard } from '../../wizard/WizardProvider';

export default function StayPreview() {
  const { currentStep, registerBeforeNext, setNextDisabled } = useWizard();

  const { data } = useWizardData();

  const [isModalOpen, setIsModalOpen] = useState(false);

  //중복 제출 방지
  const submittingRef = useRef(false);

  useEffect(() => {
    setNextDisabled(currentStep, false);
  }, [currentStep, setNextDisabled]);

  // 전역 Wizard 데이터에서 필요한 값 모아서 화면에 렌더링
  const stay = useMemo(() => {
    const {
      step1: { address = '주소 미정', detailAddress = '상세 주소 미정' } = {},
      step2: { s3Keys = [] } = {},
      step3: { capacity = 0, areaSize = 0 } = {},
      step4: { hostName = '', hostPhone = '' } = {},
      step5: { description = '' } = {},
    } = data ?? {};

    const images =
      s3Keys.length > 0
        ? s3Keys.map((k) => keyToPublicUrl(k))
        : ['/images/sample1.png', '/images/sample2.png']; // 미리 보기 이미지

    return {
      address,
      detailAddress,
      capacity,
      areaSize,
      hostName,
      hostPhone,
      description,
      images,
    };
  }, [data]);

  useEffect(() => {
    const cleanup = registerBeforeNext(currentStep, async () => {
      if (submittingRef.current) return false; // 이미 제출 중이면 넘어가지 않음
      submittingRef.current = true;

      try {
        const { address, detailAddress, capacity, areaSize, hostName, hostPhone, description } =
          stay;

        const { data: res } = await privateApi.post('/api/admin/stays', {
          address,
          detailAddress,
          capacity,
          areaSize,
          hostName,
          hostPhone,
          description,
        });

        const id = Number(res?.id);
        setIsModalOpen(true);
        setNextDisabled(currentStep, true); // 모달 떠 있는 동안 Next 잠금
        return false;
      } catch (err: any) {
        alert(err?.response?.data?.message ?? '등록 중 오류가 발생했어요.');
        return false; // 실패하면 다음 단계로 못 넘어가게 막음
      } finally {
        submittingRef.current = false;
      }
    });

    return cleanup;
  }, [currentStep, stay, registerBeforeNext]);

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
      {isModalOpen && (
        <Modal
          leftBtnText='아니요'
          rightBtnText='네'
          onClickLeftBtn={() => router.push('/admin')}
          onClickRightBtn={() => router.push('/admin/stays')}
          isPink={true}
        >
          사랑방이 등록되었어요 <br /> 예약 가능 날짜 선택하러 갈까요
        </Modal>
      )}
    </div>
  );
}
