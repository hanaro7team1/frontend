'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { privateApi } from '@/lib/axios-client';
import { Carousel, Header, Modal } from '@/components/common';
import { StayDescription, StayInfoChips } from '@/components/domain/stays';
import StayHeader from '@/components/domain/stays/StayHeader';
import { keyToPublicUrl } from '@/utils/stays/stays';
import { TOTAL_STEP_NUM } from '@/constants/admin/Admin';
import { useWizardData } from '../../wizard/WizardDataProvider';
import { useWizard } from '../../wizard/WizardProvider';

export default function StayPreview() {
  const router = useRouter();
  const { currentStep, registerBeforeNext, setNextDisabled } = useWizard();

  const { data } = useWizardData();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const submittingRef = useRef(false);

  // ✅ 마지막 스텝 진입 시 버튼은 기본적으로 활성화
  useEffect(() => {
    setNextDisabled(currentStep, false);
  }, [currentStep, setNextDisabled]);

  // 모달 열림/닫힘, 제출 중 상태에 따라 버튼 잠금 상태 동기화
  useEffect(() => {
    setNextDisabled(currentStep, isModalOpen || submittingRef.current);
  }, [isModalOpen, currentStep, setNextDisabled]);

  // 전역 Wizard 데이터에서 필요한 값 모아서 화면에 렌더링
  const stay = useMemo(() => {
    const {
      step1: { address = '주소 미정', detailAddress = '상세 주소 미정' } = {},
      step2: { s3Keys = [] } = {},
      step3: { capacity = 0, areaSize = 0 } = {},
      step4: { hostName = '', hostPhone = '' } = {},
      step5: { description = '' } = {},
    } = data ?? {};

    const rawKeys = data.step2?.s3Keys ?? [];

    const previewImages =
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
      s3Keys: rawKeys,
      images: previewImages,
    };
  }, [data]);

  useEffect(() => {
    const cleanup = registerBeforeNext(currentStep, async () => {
      // 공통: 저장 등 사전 작업 (예: step5 dispatch)
      if (currentStep !== TOTAL_STEP_NUM) return;

      if (submittingRef.current) return false;
      submittingRef.current = true;

      setNextDisabled(currentStep, true);

      // 마지막 스텝에 모달 오픈
      try {
        const { images, ...payload } = stay;

        await privateApi.post('/api/admin/stays', payload);

        setIsModalOpen(true); // 모달 먼저 띄우기
        setNextDisabled(currentStep, true); // 모달 떠있는 동안 Next 잠금

        return false; // 이동 금지! (registerBeforeNext가 preventDefault 하게)
      } catch (err: any) {
        alert(err?.response?.data?.message ?? '등록 중 오류가 발생했어요.');
        // 실패했으니 다시 열어줌
        submittingRef.current = false;
        setNextDisabled(currentStep, false);
        return false; // 이동 막기(사용자에게 다시 시도 기회)
      }
    });

    return cleanup;
  }, [currentStep, registerBeforeNext, stay, setNextDisabled]);

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
