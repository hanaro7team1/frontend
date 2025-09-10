import Txt from '@/components/atoms/Text';

type Props = {
  item: string;
};

export default function StayDescription({ item }: Props) {
  return (
    <Txt size={18} className='text-gray-070'>
      {item}
    </Txt>
  );
}
