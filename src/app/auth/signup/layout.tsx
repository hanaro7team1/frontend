'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { publicApi } from '@/lib/axios';
import { FixedBottomButton, Header } from '@/components/common';
import { useToast } from '@/components/common/ToastContext';
import { StepProgressBar } from '@/components/domain/admin/add';
import WizardProvider, { useWizard } from '@/components/domain/admin/add/wizard/WizardProvider';
import { formatPhone } from '@/utils/common/phoneHyphen';
import { FIRST_STEP_NUM, TOTAL_SIGN_UP_NUM } from '@/constants/admin/Admin';
import { SignUpFormProvider, useSignUpForm } from '@/contexts/SignUpFormContext';

function InnerLayout({ children }: { children: React.ReactNode }) {
  const { currentStep, goToStep } = useWizard();

  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  const { form, errors } = useSignUpForm();

  //토스트

  const { showToast } = useToast();

  //스텝별 필수 입력값 검사
  const requiredByStep: Record<number, (keyof typeof form)[]> = {
    1: ['loginId', 'password', 'confirmPassword'],
    2: ['villageName', 'region', 'phone'],
  };

  //필수 입력값 있는지 체크
  const isValid = useMemo(() => {
    const must = requiredByStep[currentStep] ?? [];
    const allFilled = must.every((k) => {
      const v = (form as any)[k];
      return typeof v === 'string' ? v.trim().length > 0 : Boolean(v);
    });
    const noErrors = must.every((k) => !(errors as any)[k]);
    return allFilled && noErrors;
  }, [form, errors, currentStep]);

  //아이디 중복 체크
  const idDuplicationCheck = async (loginId: string) => {
    const { data } = await publicApi.get(`/api/host-members/check-id?loginId=${loginId}`);
    return data.exists as boolean;
  };

  //모든 조건 만족 시 회원가입 폼 제출
  const submit = async () => {
    if (!isValid || submitting) return;
    try {
      setSubmitting(true);
      // confirmPassword는 서버에 안 보내므로 제외
      const payload = {
        loginId: form.loginId,
        password: form.password,
        villageName: form.villageName,
        region: form.region,
        phone: formatPhone(form.phone), // ← BE에서 하이픈 필요하다면 여기서 보정
      };

      await publicApi.post('/api/host-members/signup', payload);

      showToast('회원 가입이 완료되었습니다', 'success');
      router.replace('/auth/signin');
    } catch {
      showToast('오류가 발생했습니다 처음부터 다시 시도해 주세요', 'error');
      router.replace('/auth/signup');
    } finally {
      setSubmitting(false);
    }
  };

  const prevStep = () =>
    currentStep === FIRST_STEP_NUM ? router.push('/auth/signin') : goToStep(currentStep - 1);

  const nextStep = async () => {
    if (!isValid) return;
    if (currentStep === TOTAL_SIGN_UP_NUM) submit();
    else {
      //넘어가기 전에 검사하기
      const exists = await idDuplicationCheck(form.loginId.trim());
      if (exists) {
        showToast('이미 존재하는 아이디입니다', 'error', 'bottom');
        return;
      }
      goToStep(currentStep + 1);
    }
  };

  const leftButtonTxt = currentStep === FIRST_STEP_NUM ? '취소' : '이전';
  const rightButtonTxt = currentStep === TOTAL_SIGN_UP_NUM ? '가입 완료' : '다음';

  return (
    <>
      <Header title={'회원 가입'} bgColor='pink' />
      <StepProgressBar isSignUp={true} />
      {children}
      <FixedBottomButton
        leftBtnText={leftButtonTxt}
        rightBtnText={rightButtonTxt}
        isPink={true}
        disabled={!isValid}
        onClickRightBtn={nextStep}
        onClickLeftBtn={prevStep}
      />
    </>
  );
}

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return (
    <WizardProvider>
      <SignUpFormProvider>
        <InnerLayout>{children}</InnerLayout>
      </SignUpFormProvider>
    </WizardProvider>
  );
}
