import Txt from '@/components/atoms/Text';

type Props = {
  item: string;
  mode?: 'city' | 'countryside';
};

export default function StayDescription({ item, mode }: Props) {
  return (
    <div className={mode === 'city' ? 'h-45 w-full overflow-y-auto' : 'h-72 w-full'}>
      <div className='flex flex-col'>
        <Txt size={18} className='text-gray-070'>
          {item}
        </Txt>
      </div>
    </div>
  );
}
