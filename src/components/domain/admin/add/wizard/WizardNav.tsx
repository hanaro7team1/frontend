'use client';

import { useRouter } from 'next/navigation';
import { FixedBottomButton } from '@/components/common';
import { FIRST_STEP_NUM, TOTAL_STEP_NUM } from '@/constants/admin/Admin';
import { useWizard } from './WizardProvider';

//버튼 핸들러 담당

export default function WizardNav() {
  const { currentStep, goToStep, isNextDisable, tryProceed } = useWizard();
  const leftButtonTxt = currentStep === FIRST_STEP_NUM ? '취소' : '이전';
  const rightButtonTxt = currentStep === TOTAL_STEP_NUM ? '등록 완료' : '다음';

  const router = useRouter();

  const prevStep = () =>
    currentStep === FIRST_STEP_NUM ? router.back() : goToStep(currentStep - 1);

  //다음 step으로 이동하기 전에 이벤트 실행
  const nextStep = async () => {
    const ok = await tryProceed();
    if (!ok) return;

    if (currentStep !== TOTAL_STEP_NUM) {
      goToStep(currentStep + 1);
    }
  };

  return (
    <FixedBottomButton
      leftBtnText={leftButtonTxt}
      rightBtnText={rightButtonTxt}
      isPink
      onClickRightBtn={nextStep}
      onClickLeftBtn={prevStep}
      disabled={isNextDisable}
    />
  );
}
