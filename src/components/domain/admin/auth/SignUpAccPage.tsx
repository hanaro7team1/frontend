import { Input, Txt } from '@/components/atoms';
import { useSignUpForm } from '@/contexts/SignUpFormContext';
import { PasswordField } from './PasswordField';

export default function SignUpAccPage() {
  const { form, errors, handleChange } = useSignUpForm();

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center gap-2'>
          <Txt size={24}>아이디</Txt>
          <Txt size={18} className='text-pink-a76'>
            *필수
          </Txt>
        </div>
        <Input
          value={form.loginId}
          placeholder={'아이디를 입력해 주세요'}
          onChange={(e) => handleChange('loginId', e.target.value)}
        />
        {errors.loginId && (
          <Txt size={18} className='text-pink-a76'>
            {errors.loginId}
          </Txt>
        )}
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center gap-2'>
          <Txt size={24}>비밀번호</Txt>
          <Txt size={18} className='text-pink-a76'>
            *필수
          </Txt>
        </div>
        <PasswordField
          value={form.password}
          placeholder={'영문자,숫자,특수문자를 포함한 8~20자'}
          onChange={(v) => handleChange('password', v)}
        />
        {errors.password && (
          <Txt size={18} className='text-pink-a76'>
            {errors.password}
          </Txt>
        )}
      </div>

      <div className='flex flex-col gap-5'>
        <div className='flex items-center gap-2'>
          <Txt size={24}>비밀번호 확인</Txt>
          <Txt size={18} className='text-pink-a76'>
            *필수
          </Txt>
        </div>
        <PasswordField
          value={form.confirmPassword}
          placeholder={'영문자,숫자,특수문자를 포함한 8~20자'}
          onChange={(v) => handleChange('confirmPassword', v)}
        />
        {errors.confirmPassword && (
          <Txt size={18} className='text-pink-a76'>
            {errors.confirmPassword}
          </Txt>
        )}
      </div>
    </div>
  );
}
