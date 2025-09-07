'use client';

import { useEffect, useMemo, useState } from 'react';
import { Input, Txt } from '@/components/atoms';
import { useStep5Prefill } from '@/hooks/admin/useStep5Prefill';
import { coercePhoneRaw, formatPhone, isPhoneLike } from '@/utils/common/phoneHyphen';
import { useWizardData } from '../../wizard/WizardDataProvider';
import { useWizard } from '../../wizard/WizardProvider';
import AiLoading from './AiLoading';

export default function AddOwner() {
  const { currentStep, setNextDisabled, registerBeforeNext } = useWizard();
  const { data, dispatch } = useWizardData();

  const [hostName, setHostName] = useState<string>(data.step4.hostName ?? '');
  const [phoneRaw, setPhoneRaw] = useState<string>(data.step4.hostPhone ?? '');

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const native = e.nativeEvent as InputEvent | undefined;
    setPhoneRaw((prev) =>
      coercePhoneRaw(prev, e.target.value, e.target.selectionStart, native?.inputType),
    );
  };

  const isValid = useMemo(() => {
    const nameOk = hostName.trim().length >= 1; // 필요하면 2글자 이상으로 조절
    return nameOk && isPhoneLike(phoneRaw);
  }, [hostName, phoneRaw]);

  // Next 버튼 활성/비활성 제어
  useEffect(() => {
    setNextDisabled(currentStep, !isValid);
  }, [currentStep, isValid, setNextDisabled]);

  //step2에서 저장한 s3key 하나 넘겨주기
  const step2FirstKey = data.step2?.s3Keys?.[0];

  const { loading } = useStep5Prefill({
    currentStep,
    registerBeforeNext,
    setNextDisabled,
    dispatch,
    isValid,
    step4: { hostName, hostPhone: formatPhone(phoneRaw) },
    s3Key: step2FirstKey,
  });

  return (
    <>
      <Txt>사랑방 주인의 성함은 무엇인가요?</Txt>
      <div className='mb-10 flex gap-4'>
        <Input
          placeholder={''}
          value={hostName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHostName(e.target.value)}
        />
        <Txt size={25} className='pr-30'>
          님
        </Txt>
      </div>
      <Txt>사랑방 주인의 전화번호를 입력하세요</Txt>
      <Input
        placeholder='예시) 010-1234-5678'
        value={formatPhone(phoneRaw)}
        onChange={onPhoneChange}
      />
      {loading && <AiLoading />}
    </>
  );
}
