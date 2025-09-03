'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { publicApi } from '@/lib/axios';
import { clampNum } from '@/lib/utils';
import { FixedBottomButton, Header, Modal } from '@/components/common';
import { StepProgressBar } from '@/components/domain/admin/add';
import WizardProvider from '@/components/domain/admin/add/wizard/WizardProvider';
import { formatPhone } from '@/utils/common/phoneHyphen';
import { FIRST_STEP_NUM, TOTAL_SIGN_UP_NUM } from '@/constants/admin/Admin';
import { SignUpFormProvider, useSignUpForm } from '@/contexts/SignUpFormContext';

function InnerLayout({ children }: { children: React.ReactNode }) {
  const search = useSearchParams();

  const pathName = usePathname();

  const router = useRouter();

  const [openModal, setModalOpened] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  //현재 스텝 계산
  const raw = Number(search.get('step') ?? 1);
  const currentStep = clampNum({ n: isNaN(raw) ? 1 : raw });

  const { form, errors } = useSignUpForm();

  const handleStep = (next: number) => {
    const q = new URLSearchParams(search.toString());
    q.set('step', String(clampNum({ n: next, max: TOTAL_SIGN_UP_NUM })));
    router.push(`${pathName}?${q.toString()}`);
  };

  //스텝별 필수 입력값 검사
  const requiredByStep: Record<number, (keyof typeof form)[]> = {
    1: ['loginId', 'password', 'confirmPassword'],
    2: ['villageName', 'region', 'phone'],
  };

  const isValid = useMemo(() => {
    const must = requiredByStep[currentStep] ?? [];
    const allFilled = must.every((k) => {
      const v = (form as any)[k];
      return typeof v === 'string' ? v.trim().length > 0 : Boolean(v);
    });
    const noErrors = must.every((k) => !(errors as any)[k]);
    return allFilled && noErrors;
  }, [form, errors, currentStep]);

  const idDuplicationCheck = async (loginId: string) => {
    const { data } = await publicApi.get(`/api/host-members/check-id?loginId=${loginId}`);
    return data.exists as boolean;
  };

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

      //TODO: 토스트 추가 성공하면 무조건 로그인으로
      router.replace('/auth/signin');
    } catch (e) {
      // TODO: 에러 모달/토스트
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const prevStep = () =>
    currentStep === FIRST_STEP_NUM ? router.push('/auth/signin') : handleStep(currentStep - 1);

  const nextStep = async () => {
    if (!isValid) return;
    if (currentStep === TOTAL_SIGN_UP_NUM) submit();
    else {
      //넘어가기 전에 검사하기
      const exists = await idDuplicationCheck(form.loginId.trim());
      if (exists) {
        setModalOpened(true);
        return;
      }
      handleStep(currentStep + 1);
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
      {/* TODO: 여기도 토스트 처리... */}
      {openModal && (
        <Modal
          rightBtnText={'취소'}
          leftBtnText={'확인'}
          onClickRightBtn={() => setModalOpened(false)}
          onClickLeftBtn={() => setModalOpened(false)}
          isPink
        >
          중복 아이디입니다 <br /> 새로운 아이디를 입력해 주세요
        </Modal>
      )}
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
