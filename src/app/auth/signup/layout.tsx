'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { clampNum } from '@/lib/utils';
import { FixedBottomButton, Header } from '@/components/common';
import { StepProgressBar } from '@/components/domain/admin/add';
import { FIRST_STEP_NUM, TOTAL_SIGN_UP_NUM, TOTAL_STEP_NUM } from '@/constants/admin/Admin';

export default function SingUpLayout({ children }: { children: React.ReactNode }) {
  const search = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  //현재 스텝 계산
  const raw = Number(search.get('step') ?? 1);
  const currentStep = clampNum({ n: isNaN(raw) ? 1 : raw });

  const handleStep = (next: number) => {
    const q = new URLSearchParams(search.toString());
    q.set('step', String(clampNum({ n: next, max: TOTAL_SIGN_UP_NUM })));
    router.push(`${pathName}?${q.toString()}`);
  };

  const prevStep = () =>
    currentStep === FIRST_STEP_NUM ? router.push('/auth/signin') : handleStep(currentStep - 1);

  //TODO: admin인지 아닌지 구분해서 홈으로 보내 주기
  const nextStep = () =>
    currentStep === TOTAL_SIGN_UP_NUM ? router.push('/admin') : handleStep(currentStep + 1);

  const leftButtonTxt = currentStep === FIRST_STEP_NUM ? '취소' : '이전';
  const rightButtonTxt = currentStep === TOTAL_SIGN_UP_NUM ? '가입 완료' : '다음';

  return (
    <>
      <Header title={'회원 가입'} bgColor='pink' />
      <StepProgressBar currentStep={currentStep} isSignUp={true} />
      {children}
      <FixedBottomButton
        leftBtnText={leftButtonTxt}
        rightBtnText={rightButtonTxt}
        isPink={true}
        onClickRightBtn={nextStep}
        onClickLeftBtn={prevStep}
      />
    </>
  );
}
