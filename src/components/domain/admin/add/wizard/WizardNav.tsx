'use client';

import router from 'next/router';
import { FixedBottomButton } from '@/components/common';
import { FIRST_STEP_NUM, TOTAL_STEP_NUM } from '@/constants/admin/Admin';
import { useWizard } from './WizardProvider';

//버튼 핸들러 담당

export default function WizardNav() {
  const { currentStep, goToStep } = useWizard();
  const leftButtonTxt = currentStep === FIRST_STEP_NUM ? '취소' : '이전';
  const rightButtonTxt = currentStep === TOTAL_STEP_NUM ? '등록 완료' : '다음';

  const prevStep = () =>
    currentStep === FIRST_STEP_NUM ? router.push('/admin') : goToStep(currentStep - 1);

  //다음 step으로 이동하기 전에 이벤트 실행
  const nextStep = async () => {
    const event = new CustomEvent('wizard: BeforeNext', { detail: { step: currentStep } });
    const canceld = !window.dispatchEvent(event);
    if (canceld) return;
    currentStep === TOTAL_STEP_NUM ? router.push('/admin/stays') : goToStep(currentStep + 1);
  };

  return (
    <FixedBottomButton
      leftBtnText={leftButtonTxt}
      rightBtnText={rightButtonTxt}
      isPink={true}
      onClickRightBtn={nextStep}
      onClickLeftBtn={prevStep}
    />
  );
}
