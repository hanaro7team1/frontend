'use client';

import { useEffect, useState } from 'react';
import { Input, Txt } from '@/components/atoms';
import { useWizardData } from '../../wizard/WizardDataProvider';
import { useWizard } from '../../wizard/WizardProvider';

export default function AddCapacity() {
  const { currentStep, registerBeforeNext, setNextDisabled } = useWizard();

  const { data, dispatch } = useWizardData();

  // capacity: 정수, 최소 1명
  const [capacity, setCapacity] = useState<string>(String(data.step3.capacity)); // area: 소수 허용, 최소 0
  const [areaSize, setArea] = useState<string>(String(data.step3.areaSize));

  const isValid =
    Number(capacity) > 0 && Number.isInteger(Number(capacity)) && Number(areaSize) > 0;

  useEffect(() => {
    setNextDisabled(currentStep, !isValid);
  }, [currentStep, isValid, setNextDisabled]);

  useEffect(() => {
    const unregister = registerBeforeNext(currentStep, async () => {
      dispatch({
        type: 'SET_STEP3',
        payload: { capacity: Math.floor(Number(capacity)), areaSize: Number(areaSize) },
      });
    });
    return unregister;
  }, [capacity, areaSize, currentStep, dispatch, isValid, registerBeforeNext]);

  return (
    <>
      <Txt>사랑방의 최대 수용 가능 인원은 몇 명인가요?</Txt>
      <div className='flex gap-4 px-[81px]'>
        <Input
          type='number'
          max={100}
          step={1}
          placeholder={''}
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <Txt size={30}>명</Txt>
      </div>
      <Txt>사랑방의 면적을 입력하세요</Txt>
      <div className='flex gap-4 px-[81px]'>
        <Input
          type='number'
          step={1}
          placeholder={''}
          value={areaSize}
          onChange={(e) => setArea(e.target.value)}
          inputMode='decimal'
        />
        <Txt size={30}>평</Txt>
      </div>
    </>
  );
}
