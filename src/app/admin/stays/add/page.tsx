'use client';

import { useSearchParams } from 'next/navigation';
import { clampNum } from '@/lib/utils';
import { STEPS } from '@/constants/admin/add/AdminStayAdd';

export default function AdminStayAddPage({ searchParams }: { searchParams: { step?: string } }) {
  const search = useSearchParams();
  const n = Number(search.get('step') ?? '');
  const stepNum = clampNum({ n });
  const View = STEPS[stepNum - 1];
  return (
    <div className='flex flex-col gap-4 p-4'>
      <View />
    </div>
  );
}
