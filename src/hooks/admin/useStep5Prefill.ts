'use client';

import { useEffect, useState } from 'react';
import { fetchStep5Caption } from '@/utils/stays/step5-ai';
import { WizardDataDispatch } from '@/types/wizard';

type Params = {
  currentStep: number;
  registerBeforeNext: (
    step: number,
    fn?: () => boolean | void | Promise<boolean | void>,
  ) => () => void;
  setNextDisabled: (step: number, disabled: boolean) => void;
  dispatch: WizardDataDispatch;
  isValid: boolean;
  step4: { hostName: string; hostPhone: string };
  s3Key: string;
};

export function useStep5Prefill({
  currentStep,
  registerBeforeNext,
  setNextDisabled,
  dispatch,
  isValid,
  step4,
  s3Key,
}: Params) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cleanup = registerBeforeNext(currentStep, async () => {
      // 1) Step4는 항상 저장
      dispatch({
        type: 'SET_STEP4',
        payload: { hostName: step4.hostName.trim(), hostPhone: step4.hostPhone },
      });

      if (!isValid) return;

      // 2) 로딩 켜고 Next 잠금
      setLoading(true);
      setNextDisabled(currentStep, true);

      try {
        const caption = await fetchStep5Caption(s3Key);
        const description = caption?.trim() || '사진 설명을 불러오지 못했어요. 직접 작성해 주세요.';
        // 3) Step5 초기값 주입
        dispatch({ type: 'SET_STEP5', payload: { description } });
      } catch {
        dispatch({
          type: 'SET_STEP5',
          payload: { description: '사진 설명을 불러오지 못했어요. 직접 작성해 주세요.' },
        });
      } finally {
        setLoading(false);
        setNextDisabled(currentStep, false);
      }
    });

    return cleanup;
  }, [
    s3Key,
    currentStep,
    dispatch,
    isValid,
    registerBeforeNext,
    setNextDisabled,
    step4.hostName,
    step4.hostPhone,
  ]);

  return { loading };
}
