'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { clampNum } from '@/lib/utils';
import { BeforeNextFn, WizardContext } from '@/types/wizard';

//1.현재 스텝 번호(1~6 를 쿼리로부터 읽어와 관리
//2.각 스텝 페이지가 다음으로 이동하는 버튼 누르기 전에 실행할 함수 레지스트리
//3.이 두 가지를 Context로 제공해서 접근 가능하게 함

const wizardContext = createContext<WizardContext | null>(null);

export default function WizardProvider({ children }: { children: React.ReactNode }) {
  const [disabledByStep, setDisabledByStep] = useState<Record<number, boolean>>({});

  const setNextDisabled = useCallback((step: number, disabled: boolean) => {
    setDisabledByStep((prev) => (prev[step] === disabled ? prev : { ...prev, [step]: disabled }));
  }, []);

  //  진짜 스텝은 내부 상태로만
  const [currentStep, setStep] = useState<number>(1);

  const isNextDisable = disabledByStep[currentStep] ?? true;

  //step 번호가 key, 다음으로 이동하기 전에 실행할 함수 BeforeNextFn
  const req = useRef(new Map<number, BeforeNextFn>());

  //다음 스텝으로 넘어가기 전에 만족하지 않은 조건 있는지 확인!!
  const stepGuard = async (step: number) => {
    const guard = req.current.get(step);
    if (!guard) return true;
    try {
      const r = await guard();
      return r !== false;
    } catch {
      return false;
    }
  };

  const goToStep = useCallback(
    async (n: number) => {
      const next = clampNum({ n });
      if (next > currentStep) {
        const ok = await stepGuard(currentStep);
        if (!ok) return; // 막기
      }
      setStep(next);
    },
    [currentStep],
  );

  const registerBeforeNext: WizardContext['registerBeforeNext'] = useCallback((step, fn) => {
    if (fn) req.current.set(step, fn);
    else req.current.delete(step);
    return () => req.current.delete(step);
  }, []);

  const tryProceed = useCallback(() => stepGuard(currentStep), [currentStep]);

  const value = useMemo(
    () => ({
      registerBeforeNext,
      currentStep,
      goToStep,
      setNextDisabled,
      isNextDisable,
      tryProceed,
    }),
    [registerBeforeNext, currentStep, goToStep, setNextDisabled, isNextDisable, tryProceed],
  );

  return <wizardContext.Provider value={value}>{children}</wizardContext.Provider>;
}

export const useWizard = () => {
  const value = useContext(wizardContext);
  if (!value) throw new Error('useWizard는 WizardProvider 안에서 써야 합니다');
  return value;
};
