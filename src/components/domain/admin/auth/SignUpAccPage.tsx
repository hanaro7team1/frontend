import { Input, Txt } from '@/components/atoms';
import useValidation from '@/hooks/auth/uesValidation';

export default function SignUpAccPage() {
  return (
    <div className='flex flex-col gap-10'>
      <div className='gap-5'>
        <Txt size={24}>아이디</Txt>
        <Input name='id' placeholder={'아이디를 입력해 주세요'} />
      </div>
      <div className='gap-5'>
        <Txt size={24}>비밀번호</Txt>
        <Input placeholder={'영문자,숫자,특수문자를 포함한 8~20자'} />
      </div>
      <div className='gap-5'>
        <Txt size={24}>비밀번호 확인</Txt>
        <Input placeholder={'비밀번호를 한 번 더 입력해 주세요'} />
      </div>
    </div>
  );
}
