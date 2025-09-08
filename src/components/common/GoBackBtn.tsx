'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms';

export default function GoBackBtn() {
  const router = useRouter();
  const handleGoBack = () => router.back();

  return <Button title='이전 화면으로' onClick={handleGoBack} />;
}
