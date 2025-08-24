import { cn } from '@/lib/utils';
import { Txt } from '@/components/atoms';
import { STEP_TEXT_SIZE } from '@/constants/common/StepCircle';

type Props = {
  stepNumber: number;
  stepName: string;
  isActive?: boolean;
};

export default function StepCircle({ stepNumber, stepName, isActive }: Props) {
  return (
    <div className='relative z-10 flex flex-col items-center px-1'>
      <div
        className={cn(
          'bg-gray-6d6 inline-flex h-10 w-10 items-center justify-center rounded-full',
          { 'bg-green-49d': isActive },
        )}
      >
        <Txt className='text-white'>{stepNumber}</Txt>
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
