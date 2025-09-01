'use client';

import { Header } from '@/components/common';
import { StepProgressBar } from '@/components/domain/admin/add';
import WizardDataProvider from '@/components/domain/admin/add/wizard/WizardDataProvider';
import WizardNav from '@/components/domain/admin/add/wizard/WizardNav';
import WizardProvider from '@/components/domain/admin/add/wizard/WizardProvider';

export default function AddLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header title={'우리 마을 사랑방 등록'} bgColor='pink' />
      <WizardProvider>
        <WizardDataProvider>
          <StepProgressBar />
          {children}
          <WizardNav />
        </WizardDataProvider>
      </WizardProvider>
    </>
  );
}
