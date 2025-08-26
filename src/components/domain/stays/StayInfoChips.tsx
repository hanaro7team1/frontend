import Tag from '@/components/atoms/Tag';

type Props = {
  capacity: number;
  area: number;
};

export default function StayInfoChips({ capacity, area }: Props) {
  return (
    <div className='flex gap-4'>
      <Tag label={`최대 ${capacity}명 수용`} />
      <Tag label={`${area}평`} />
    </div>
  );
}
