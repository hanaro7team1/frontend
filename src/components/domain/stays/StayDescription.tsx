import Txt from '@/components/atoms/Text';

type Props = {
  item: string;
  mode?: 'city' | 'countryside';
};

export default function StayDescription({ item, mode }: Props) {
  return (
        <Txt size={18} className='text-gray-070'>
          {item}
        </Txt>
  );
}
