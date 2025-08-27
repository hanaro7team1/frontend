import { SquareRoundCorner } from 'lucide-react';
import { ShadowBox } from '@/components/atoms';
import { InfoRow } from '../../reservations';

type Props = {
  area: number;
};

export default function EditStayArea({ area }: Props) {
  return (
    <ShadowBox className='gap-3.5 px-3.5 py-3'>
      <InfoRow icon={SquareRoundCorner} label='면적' value={area + ''} />
    </ShadowBox>
  );
}
