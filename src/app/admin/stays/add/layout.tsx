'use client';

import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/common';
import { StepProgressBar } from '@/components/domain/admin/add';
import WizardDataProvider from '@/components/domain/admin/add/wizard/WizardDataProvider';
import WizardNav from '@/components/domain/admin/add/wizard/WizardNav';
import WizardProvider from '@/components/domain/admin/add/wizard/WizardProvider';

export default function AddLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const step = Number(searchParams.get('step') ?? '1');

  const showChrome = step < 6; // step=6 미리보기면 감춤
  return (
    <>
      <WizardProvider>
        <WizardDataProvider>
          {showChrome && (
            <>
              <Header title={'우리 마을 사랑방 등록'} bgColor='pink' />
              <StepProgressBar />
            </>
          )}
          {children}
          <WizardNav />
        </WizardDataProvider>
      </WizardProvider>
    </>
  );
}
