import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button, ShadowBox, Txt } from '@/components/atoms';

type Props = {
  buttonTxt: string;
  phoneNum?: string;
};

export default function ChangeBox({ buttonTxt, phoneNum }: Props) {
  const router = useRouter();

  return (
    <div>
      <ShadowBox className='gap-4 p-4'>
        <div className='flex items-center gap-5 pl-4'>
          {phoneNum ? (
            <Image src='/icons/Ic_Phone_circle_fill.svg' alt='전화번호' width={50} height={50} />
          ) : (
            <Image src='/icons/Ic_Lock_circle_fill.svg' alt='비밀번호' width={50} height={50} />
          )}
          <Txt size={24} weight='bold'>
            {phoneNum || '**************'}
          </Txt>
        </div>
        <Button
          title={buttonTxt}
          color='gray'
          onClick={() =>
            phoneNum ? router.push('/admin/mypage/contact') : router.push('/admin/mypage/pwd')
          }
        />
      </ShadowBox>
    </div>
  );
}
