'use client';

import { useEffect, useMemo, useState } from 'react';
import { Input, Txt } from '@/components/atoms';
import { coercePhoneRaw, formatPhone, isPhoneLike } from '@/utils/common/phoneHyphen';
import { useWizardData } from '../../wizard/WizardDataProvider';
import { useWizard } from '../../wizard/WizardProvider';

export default function AddOwner() {
  const { currentStep, registerBeforeNext, setNextDisabled } = useWizard();
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

  // “다음” 누르기 직전 컨텍스트에 저장
  useEffect(() => {
    const cleanup = registerBeforeNext(currentStep, async () => {
      // 전역에는 raw(하이픈 없는) 값 저장
      dispatch({ type: 'SET_STEP4', payload: { hostName: hostName.trim(), hostPhone: phoneRaw } });
    });
    return cleanup;
  }, [currentStep, dispatch, hostName, phoneRaw, registerBeforeNext]);

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
        placeholder='예시) 01012345567'
        value={formatPhone(phoneRaw)}
        onChange={onPhoneChange}
      />
    </>
  );
}
