import { clampNum } from '@/lib/utils';
import { STEPS } from '@/constants/admin/add/AdminStayAdd';

export default function AdminStayAddPage({ searchParams }: { searchParams: { step?: string } }) {
  const n = parseInt(searchParams.step ?? '', 10) || 1;
  const stepNum = clampNum({ n });
  const View = STEPS[stepNum - 1];
  return <View />;
}
