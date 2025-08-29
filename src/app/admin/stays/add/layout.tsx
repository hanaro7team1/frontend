'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { clampNum } from '@/lib/utils';
import { FixedBottomButton, Header } from '@/components/common';
import { StepProgressBar } from '@/components/domain/admin/add';
import WizardNav from '@/components/domain/admin/add/wizard/WizardNav';
import WizardProvider from '@/components/domain/admin/add/wizard/WizardProvider';
import { FIRST_STEP_NUM, TOTAL_STEP_NUM } from '@/constants/admin/Admin';

export default function AddLayout({ children }: { children: React.ReactNode }) {
  const search = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  //현재 스텝 계산
  const raw = Number(search.get('step') ?? 1);
  const currentStep = clampNum({ n: isNaN(raw) ? 1 : raw });

  const handleStep = (next: number) => {
    const q = new URLSearchParams(search.toString());
    q.set('step', String(clampNum({ n: next })));
    router.push(`${pathName}?${q.toString()}`);
  };

  const prevStep = () =>
    currentStep === FIRST_STEP_NUM ? router.push('/admin') : handleStep(currentStep - 1);
  const nextStep = () =>
    currentStep === TOTAL_STEP_NUM ? router.push('/admin/stays') : handleStep(currentStep + 1);

  const leftButtonTxt = currentStep === FIRST_STEP_NUM ? '취소' : '이전';
  const rightButtonTxt = currentStep === TOTAL_STEP_NUM ? '등록 완료' : '다음';

  return (
    <>
      <Header title={'우리 마을 사랑방 등록'} bgColor='pink' />
      <WizardProvider>
        <StepProgressBar />
        {children}
        <WizardNav />
      </WizardProvider>
    </>
  );
}
