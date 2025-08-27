'use client';

import { useSearchParams } from 'next/navigation';
import { clampNum } from '@/lib/utils';
import SignUpAccPage from '@/components/domain/admin/auth/SignUpAccPage';
import SignUpInfoPage from '@/components/domain/admin/auth/SignUpInfoPage';

export default function SignUpPage() {
  const search = useSearchParams();
  const n = Number(search.get('step') ?? '');
  const stepNum = clampNum({ n });
  return (
    <div className='flex flex-col gap-4 p-4'>
      {stepNum === 1 ? <SignUpAccPage /> : <SignUpInfoPage />}
    </div>
  );
}
