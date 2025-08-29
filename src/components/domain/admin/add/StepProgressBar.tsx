'use client';

import { cn } from '@/lib/utils';
import { ADD_STEPS, SIGN_UP_STEPS } from '@/constants/common/StepCircle';
import { StepCircle } from '.';
import { useWizard } from './wizard/WizardProvider';

type Props = {
  isSignUp?: boolean;
};

export default function StepProgressBar({ isSignUp = false }: Props) {
  const { currentStep } = useWizard();
  const STEPS = isSignUp ? SIGN_UP_STEPS : ADD_STEPS;
  return (
    <div className='bg-gray-484/5 relative w-full py-4'>
      <div
        className={cn('bg-gray-6d6 absolute inset-x-[10%] top-8 h-[2px]', {
          'inset-x-[40%]': isSignUp,
        })}
        aria-hidden
      />
      <div
        className={cn('mx-auto grid w-full max-w-[680px] grid-cols-5', {
          'grid-cols-4': isSignUp,
        })}
      >
        {STEPS.map((name, idx) => (
          <StepCircle
            key={name}
            stepNumber={idx + 1}
            stepName={name}
            isActive={currentStep === idx + 1}
            {...(isSignUp && {
              className: idx === 0 ? 'col-start-2' : 'col-start-3',
            })}
          />
        ))}
      </div>
    </div>
  );
}
