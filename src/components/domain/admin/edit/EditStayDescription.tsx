import { SquareRoundCorner, Users } from 'lucide-react';
import { Input, ShadowBox, Txt } from '@/components/atoms';
import { InfoRow } from '../../reservations';

type Props = {
  data: {
    description: string;
  };
};

export default function EditStayDescription({ data }: Props) {
  const { description } = data;
  return (
    <div className='flex flex-col gap-4'>
      <Txt size={22}>사랑방에 대해 상세하게 알려주세요</Txt>

      <Input
        placeholder='사랑방을 소개해주세요'
        tag='textarea'
        defaultValue={description}
        className='resize-none'
      />
    </div>
  );
}
