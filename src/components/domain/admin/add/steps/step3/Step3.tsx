'use client';

import { useEffect } from 'react';
import { Input, Txt } from '@/components/atoms';
import { useNumberInput } from '@/hooks/admin/useNumberInput';
import { useWizardData } from '../../wizard/WizardDataProvider';
import { useWizard } from '../../wizard/WizardProvider';

export default function AddCapacity() {
  const { currentStep, registerBeforeNext, setNextDisabled } = useWizard();

  const { data, dispatch } = useWizardData();

  // capacity: 정수, 최소 1명
  const capacity = useNumberInput(data.step3.capacity, { min: 1 });
  // area: 소수 허용, 최소 0
  const area = useNumberInput(data.step3.areaSize, { allowDecimal: true, min: 0 });

  const isValid = capacity !== null && area.value !== null;

  useEffect(() => {
    setNextDisabled(currentStep, !isValid);
  }, [currentStep, isValid, setNextDisabled]);

  useEffect(() => {
    const unregister = registerBeforeNext(currentStep, async () => {
      if (!isValid) throw new Error('Step3 invalid');
      dispatch({
        type: 'SET_STEP3',
        payload: { capacity: capacity.value!, areaSize: area.value! },
      });
    });
    return unregister;
  }, [capacity.value, area.value, currentStep, dispatch, isValid, registerBeforeNext]);

  return (
    <>
      <Txt>사랑방의 최대 수용 가능 인원은 몇 명인가요?</Txt>
      <div className='flex gap-4 px-[81px]'>
        <Input
          placeholder={''}
          value={capacity.str}
          onChange={capacity.onChange}
          inputMode='decimal'
        />
        <Txt size={30}>명</Txt>
      </div>
      <Txt>사랑방의 면적을 입력하세요</Txt>
      <div className='flex gap-4 px-[81px]'>
        <Input placeholder={''} value={area.str} onChange={area.onChange} inputMode='decimal' />
        <Txt size={30}>평</Txt>
      </div>
    </>
  );
}
