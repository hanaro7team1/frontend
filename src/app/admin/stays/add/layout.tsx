'use client';

import { Header } from '@/components/common';
import { StepProgressBar } from '@/components/domain/admin/add';
import WizardDataProvider from '@/components/domain/admin/add/wizard/WizardDataProvider';
import WizardNav from '@/components/domain/admin/add/wizard/WizardNav';
import WizardProvider, { useWizard } from '@/components/domain/admin/add/wizard/WizardProvider';

export default function AddLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WizardProvider>
        <WizardDataProvider>
          <WizardFrame>{children}</WizardFrame>
          <WizardNav />
        </WizardDataProvider>
      </WizardProvider>
    </>
  );
}

//useWizard는 wizardProvide 안에서만 사용 가능해서 쉘 컴포넌트 하나 만듦
function WizardFrame({ children }: { children: React.ReactNode }) {
  const { currentStep } = useWizard();
  const showChrome = currentStep < 6; // step=6 미리보기에선 헤더 + 프로그레스 바 감추기

  return (
    <>
      {showChrome && (
        <>
          <Header title='우리 마을 사랑방 등록' bgColor='pink' />
          <StepProgressBar />
        </>
      )}
      {children}
      <WizardNav />
    </>
  );
}
