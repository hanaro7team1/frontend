import { Users } from 'lucide-react';
import { ShadowBox } from '@/components/atoms';
import { InfoRow } from '../../reservations';

type Props = {
  capacity: number;
};

export default function EditStayCapacity({ capacity }: Props) {
  return (
    <ShadowBox className='gap-3.5 px-3.5 py-3'>
      <InfoRow icon={Users} label='최대 수용 인원' value={capacity + ''} />
    </ShadowBox>
  );
}
