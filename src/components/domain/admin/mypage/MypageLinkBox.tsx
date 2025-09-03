import Image from 'next/image';
import Link from 'next/link';
import { Button, ShadowBox, Txt } from '@/components/atoms';

type Props = {
  type: 'phone' | 'password';
  value?: string;
  href: string;
};

export default function MypageLinkBox({ type, value, href }: Props) {
  const isPhone = type === 'phone';
  const buttonTxt = isPhone ? '전화번호 변경' : '비밀번호 변경';
  const iconSrc = isPhone ? '/icons/Ic_Phone_circle_fill.svg' : '/icons/Ic_Lock_circle_fill.svg';
  const altText = isPhone ? '전화번호' : '비밀번호';
  const displayValue = value || '**************';

  return (
    <div>
      <ShadowBox className='gap-4 p-4'>
        <div className='flex items-center gap-5 pl-4'>
          <Image src={iconSrc} alt={altText} width={50} height={50} />
          <Txt size={24} weight='bold'>
            {displayValue}
          </Txt>
        </div>
        <Link href={href}>
          <Button title={buttonTxt} color='gray' />
        </Link>
      </ShadowBox>
    </div>
  );
}
