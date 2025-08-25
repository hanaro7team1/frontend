import Txt from '@/components/atoms/Text';

type Props = {
  title: string;
  address: string;
};

export default function StayHeader({ title, address }: Props) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-2'>
        <img src='/icons/Ic_House_big.svg' alt='home-icon' className='w-7' />
        <Txt size={25} weight='bold' align='left'>
          {title}
        </Txt>
      </div>

      <Txt size={20} weight='cm' align='left' className='text-black-626'>
        {address}
      </Txt>
    </div>
  );
}
