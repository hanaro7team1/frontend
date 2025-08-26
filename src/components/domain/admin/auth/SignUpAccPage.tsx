import { Input, Txt } from '@/components/atoms';
import useValidation from '@/hooks/auth/uesValidation';

export default function SignUpAccPage() {
  const { form, errors, handleChange } = useValidation();

  // TODO: 회원가입 API 호출

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-5'>
        <Txt size={24} align='left'>
          아이디
        </Txt>
        <Input
          name='id'
          placeholder={'아이디를 입력해 주세요'}
          onChange={(e) => handleChange('id', e.target.value)}
        />
        {errors.id && (
          <Txt size={18} align='left' className='text-pink-a76'>
            {errors.id}
          </Txt>
        )}
      </div>
      <div className='flex flex-col gap-5'>
        <Txt size={24} align='left'>
          비밀번호
        </Txt>
        <Input
          name='password'
          placeholder={'영문자,숫자,특수문자를 포함한 8~20자'}
          onChange={(e) => handleChange('password', e.target.value)}
        />
        {errors.password && (
          <Txt size={18} align='left' className='text-pink-a76'>
            {errors.password}
          </Txt>
        )}
      </div>

      <div className='flex flex-col gap-5'>
        <Txt size={24} align='left'>
          비밀번호 확인
        </Txt>
        <Input
          placeholder={'비밀번호를 한 번 더 입력해 주세요'}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
        />
        {errors.confirmPassword && (
          <Txt size={18} align='left' className='text-pink-a76'>
            {errors.confirmPassword}
          </Txt>
        )}
      </div>
    </div>
  );
}
