'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { privateApi } from '@/lib/axios-client';
import { Txt } from '@/components/atoms';
import { Carousel } from '@/components/common';
import { useToast } from '@/components/common/ToastContext';
import { AdminCalendarModal, StayDescription, StayInfoChips } from '@/components/domain/stays';
import StayHeader from '@/components/domain/stays/StayHeader';
import { keyToPublicUrl } from '@/utils/stays/stays';
import { getAdminInfoClient } from '@/app/api/mypage';
import { TOTAL_STEP_NUM } from '@/constants/admin/Admin';
import { StayDetailResponseType } from '@/types/stays';
import { useWizardData } from '../../wizard/WizardDataProvider';
import { useWizard } from '../../wizard/WizardProvider';

export default function StayPreview() {
  //wizard context
  const { currentStep, registerBeforeNext, setNextDisabled } = useWizard();
  const { data } = useWizardData();

  const [createdStay, setCreatedStay] = useState<StayDetailResponseType | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [villageName, setVillageName] = useState('');

  const { showToast } = useToast();

  const submittingRef = useRef(false);

  const router = useRouter();

  // 마지막 스텝 진입 시 버튼은 기본적으로 활성화
  useEffect(() => {
    setNextDisabled(currentStep, false);
  }, [currentStep, setNextDisabled]);

  // 모달 열림/닫힘, 제출 중 상태에 따라 버튼 잠금 상태 동기화
  useEffect(() => {
    setNextDisabled(currentStep, isModalOpen || submittingRef.current);
  }, [isModalOpen, currentStep, setNextDisabled]);

  const handleClose = () => {
    setIsModalOpen(false);
    router.back();
  };

  // 전역 Wizard 데이터에서 필요한 값 모아서 화면에 렌더링
  const stay = useMemo(() => {
    const {
      step1: { address = '주소 미정', detailAddress = '상세 주소 미정' } = {},
      step2: { items = [] } = {},
      step3: { capacity = 0, areaSize = 0 } = {},
      step4: { hostName = '', hostPhone = '' } = {},
      step5: { description = '' } = {},
    } = data ?? {};

    const rawKeys = items.filter((it) => !!it.s3Key).map((it) => it.s3Key!);

    const previewImages =
      rawKeys.length > 0
        ? rawKeys.map((k) => keyToPublicUrl(k))
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
    const fetchAdminInfo = async () => {
      try {
        const data = await getAdminInfoClient();
        setVillageName(data.villageName);
      } catch {
        showToast('관리자 정보를 불러오는 데 실패했습니다.', 'error');
      }
    };

    fetchAdminInfo();
  }, []);

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

        const { data } = await privateApi.post<StayDetailResponseType>('/api/admin/stays', payload);
        setCreatedStay(data);
        setIsModalOpen(true); // 모달 먼저 띄우기
        setNextDisabled(currentStep, true); // 모달 떠있는 동안 Next 잠금

        return false; // 이동 금지! (registerBeforeNext가 preventDefault 하게)
      } catch (err: any) {
        showToast(err?.response?.data?.message ?? '등록 중 오류가 발생했어요.', 'error');
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
      <header className='border-black-626/15 sticky top-0 z-50 flex h-[50px] items-center border-b bg-white'>
        <Txt size={24} align='center' className='flex-1'>
          사랑방 등록 전 미리보기
        </Txt>
      </header>

      <main className='flex-1'>
        <Carousel images={stay.images} />

        <div className='mt-8 space-y-5 p-5 pb-40'>
          <StayHeader
            title={`${villageName} 사랑방 `}
            address={stay.address}
            stayResrvStatus={'예약 가능'}
          />
          <StayInfoChips capacity={stay.capacity} area={stay.areaSize} />
          <StayDescription item={stay.description} />
        </div>
      </main>

      {isModalOpen && createdStay ? (
        <AdminCalendarModal stayId={createdStay.id} closeModal={handleClose} />
      ) : null}
    </div>
  );
}
