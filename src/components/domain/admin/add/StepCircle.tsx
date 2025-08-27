import { cn } from '@/lib/utils';
import { Txt } from '@/components/atoms';
import { STEP_TEXT_SIZE } from '@/constants/common/StepCircle';

type Props = {
  stepNumber: number;
  stepName: string;
  isActive?: boolean;
  className?: string;
};

export default function StepCircle({ stepNumber, stepName, isActive, className }: Props) {
  return (
    <div className={cn('relative z-10 flex flex-col items-center justify-center pb-4', className)}>
      <div
        className={cn(
          'bg-gray-6d6 inline-flex h-10 w-10 items-center justify-center rounded-full',
          { 'bg-pink-a76': isActive },
        )}
      >
        <Txt className='text-white'>{stepNumber}</Txt>
      </div>
      <div className='absolute top-10 text-center leading-tight'>
        <Txt
          size={STEP_TEXT_SIZE}
          className={cn('text-gray-6d6', {
            'text-pink-a76': isActive,
          })}
        >
          {stepName}
        </Txt>
      </div>
    </div>
  );
}
