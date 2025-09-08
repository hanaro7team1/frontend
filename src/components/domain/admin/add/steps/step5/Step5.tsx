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
    return t.length > 0;
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

  return (
    <>
      <div className='flex items-center gap-2'>
        <Txt>사랑방에 대해서 상세하게 알려주세요</Txt>
        <Txt size={18} className='text-pink-a76'>
          *필수
        </Txt>
      </div>
      <div className='relative w-full'>
        <Input
          placeholder={''}
          tag='textarea'
          value={text}
          maxLength={MAX_LENGTH}
          onChange={(e) => setText(e.target.value)}
          className='border-gray-6d6 resize-none border'
        />
        <div className='text-gray-070 mt-1 flex justify-end'>
          {text.length} / {MAX_LENGTH}
        </div>
      </div>
      <AiInfo />
    </>
  );
}
