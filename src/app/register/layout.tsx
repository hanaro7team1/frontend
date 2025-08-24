'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { Header } from '@/components/common';
import StepProgressBar from '@/components/common/StepProgressBar';

const stepMap: Record<string, number> = {
  address: 1,
  photos: 2,
  capacity: 3,
  owner: 4,
  description: 5,
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  const seg = useSelectedLayoutSegment();
  const currentStep = seg ? (stepMap[seg] ?? 0) : 0;
  return (
    <>
      <Header title={'우리 마을 사랑방 등록'} />
      <StepProgressBar currentStep={currentStep} />
      {children}
    </>
  );
}
