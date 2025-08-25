import Txt from '@/components/atoms/Text';

type Props = {
  items: string[];
  mode: 'city' | 'countryside';
};

export default function StayDescription({ items, mode }: Props) {
  return (
    <div
      className={
        mode === 'city'
          ? 'h-[180px] w-[364px] flex-shrink-0 overflow-y-auto'
          : 'h-[286px] w-[364px] flex-shrink-0'
      }
    >
      <div className='flex flex-col'>
        {items.map((item, idx) => (
          <Txt key={idx} size={18} weight='cm' align='left' className='text-gray-070'>
            {item}
          </Txt>
        ))}
      </div>
    </div>
  );
}
