'use client';

import { useEffect, useMemo, useState } from 'react';
import { Input, Txt } from '@/components/atoms';
import { MAX_LENGTH } from '@/constants/admin/Admin';
import { useWizardData } from '../../wizard/WizardDataProvider';
import { useWizard } from '../../wizard/WizardProvider';
import AiInfo from './AiInfo';

export default function AddDescription() {
  const { currentStep, registerBeforeNext, setNextDisabled } = useWizard();

  const { data, dispatch } = useWizardData();

  const [text, setText] = useState<string>(data.step5.description ?? '');

  const isValid = useMemo(() => {
    const t = text.trim();
    return t.length > 0 && t.length <= MAX_LENGTH;
  }, [text]);

  useEffect(() => {
    setNextDisabled(currentStep, !isValid);
  }, [currentStep, isValid, setNextDisabled]);

  useEffect(() => {
    const cleanup = registerBeforeNext(currentStep, async () => {
      dispatch({ type: 'SET_STEP5', payload: { description: text.trim() } });
    });
    return cleanup;
  }, [currentStep, dispatch, registerBeforeNext, text]);

  // 로컬만 업데이트
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value.slice(0, MAX_LENGTH));
  };

  return (
    <>
      <Txt>사랑방에 대해서 상세하게 알려주세요</Txt>
      <div className='relative w-full'>
        <Input
          placeholder={''}
          tag='textarea'
          value={text}
          onChange={onChange}
          className='border-gray-6d6 resize-none border'
        />
        <div className='absolute right-3 bottom-2 text-gray-400'>
          {text.length} / {MAX_LENGTH}
        </div>
      </div>
      <AiInfo />
    </>
  );
}
