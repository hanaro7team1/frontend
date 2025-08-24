'use client';

import { STEPS } from '@/constants/common/StepCircle';
import StepCircle from './StepCircle';

type Props = {
  currentStep: number;
};

export default function StepProgressBar({ currentStep }: Props) {
  return (
    <div className='relative w-full py-4'>
      <div className='bg-gray-6d6 absolute inset-x-[10%] top-8 h-[2px]' aria-hidden />
      <div className='mx-auto grid w-full max-w-[680px] grid-cols-5'>
        {STEPS.map((name, idx) => (
          <StepCircle
            key={name}
            stepNumber={idx + 1}
            stepName={name}
            isActive={currentStep === idx + 1}
          />
        ))}
      </div>
    </div>
  );
}
