'use client';

import { useWizard } from '@/components/domain/admin/add/wizard/WizardProvider';
import SignUpAccPage from '@/components/domain/admin/auth/SignUpAccPage';
import SignUpInfoPage from '@/components/domain/admin/auth/SignUpInfoPage';

export default function SignUpPage() {
  const { currentStep } = useWizard();
  return (
    <div className='flex flex-col gap-4 p-4'>
      {currentStep === 1 ? <SignUpAccPage /> : <SignUpInfoPage />}
    </div>
  );
}
