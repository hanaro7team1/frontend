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
    currentStep === FIRST_STEP_NUM ? router.push('/admin') : goToStep(currentStep - 1);

  //다음 step으로 이동하기 전에 이벤트 실행
  const nextStep = async () => {
    if (currentStep === TOTAL_STEP_NUM) {
      // ✅ 마지막 스텝: 가드를 직접 실행
      const ok = await tryProceed();
      if (ok) {
        // 가드가 허용(true)인 경우에만 이동 (보통은 모달 열면 false를 반환하게 구현)
        router.push('/admin/stays');
      }
      return;
    }
    goToStep(currentStep + 1);
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
