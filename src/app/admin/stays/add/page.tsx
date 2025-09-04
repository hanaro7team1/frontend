'use client';

import { useWizard } from '@/components/domain/admin/add/wizard/WizardProvider';
import { STEPS } from '@/constants/admin/Admin';

export default function AdminStayAddPage() {
  const { currentStep } = useWizard();
  const idx = Math.min(Math.max(currentStep, 1), STEPS.length) - 1;
  const View = STEPS[idx];

  return (
    <div className='flex flex-col gap-4 p-4'>
      <View />
    </div>
  );
}
