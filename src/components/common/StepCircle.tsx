import { cn } from '@/lib/utils';
import { STEP_TEXT_SIZE } from '@/constants/common/StepCircle';
import Txt from '../atoms/Text';

type Props = {
  stepNumber: number;
  stepName: string;
  isActive?: boolean;
};

export default function StepCircle({ stepNumber, stepName, isActive }: Props) {
  return (
    <div className='relative z-10 flex flex-col items-center px-1'>
      <div className='bg-gray-6d6 inline-flex h-10 w-10 items-center justify-center rounded-full'>
        <Txt
          className={cn('text-white', {
            'text-green-49d': isActive,
          })}
        >
          {stepNumber}
        </Txt>
      </div>
      <div className='text-center leading-tight'>
        <Txt
          size={STEP_TEXT_SIZE}
          className={cn('text-gray-6d6', {
            'text-green-49d': isActive,
          })}
        >
          {stepName}
        </Txt>
      </div>
    </div>
  );
}
