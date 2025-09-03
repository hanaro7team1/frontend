'use client';

import { useEffect, useState } from 'react';
import { Input, Txt } from '@/components/atoms';
import AddressSearchModal from '@/components/domain/admin/add/steps/step1/AdressSearchModal';
import { useWizardData } from '../../wizard/WizardDataProvider';
import { useWizard } from '../../wizard/WizardProvider';
import { SearchButton } from './SearchButton';

export default function AddAdress() {
  const { currentStep, registerBeforeNext, setNextDisabled } = useWizard();
  const { data, dispatch } = useWizardData();
  const [open, setOpen] = useState(false);

  const isValid = !!data.step1.address.trim();

  useEffect(() => {
    setNextDisabled(currentStep, !isValid);
    return registerBeforeNext(currentStep, () => isValid || false);
  }, [isValid, setNextDisabled, registerBeforeNext]);

  return (
    <>
      <Txt className='text-left'>사랑방의 주소를 찾아 주세요</Txt>
      <div className='mb-10 flex gap-2'>
        <Input
          placeholder={'우측 버튼을 누르고 주소를 찾아 주세요'}
          value={data.step1.address}
          readOnly
        />
        <SearchButton onClick={() => setOpen(true)} />
      </div>
      <Txt className='text-left'>사랑방의 상세 주소를 입력해 주세요</Txt>
      <Input
        placeholder={'상세 주소를 직접 입력하세요'}
        value={data.step1.detailAddress}
        onChange={(e) =>
          dispatch({ type: 'SET_STEP1', payload: { detailAddress: e.target.value } })
        }
      />
      <AddressSearchModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={({ address }) => {
          dispatch({ type: 'SET_STEP1', payload: { address } });
          setOpen(false);
        }}
      />
    </>
  );
}
