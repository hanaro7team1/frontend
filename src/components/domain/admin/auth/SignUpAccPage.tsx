import { Input, Txt } from '@/components/atoms';
import { useSignUpForm } from '@/contexts/SignUpFormContext';
import { PasswordField } from './PasswordField';

export default function SignUpAccPage() {
  const { form, errors, handleChange } = useSignUpForm();

  // TODO: 회원가입 API 호출

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-5'>
        <Txt size={24} align='left'>
          아이디
        </Txt>
        <Input
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
        <PasswordField
          value={form.password}
          placeholder={'영문자,숫자,특수문자를 포함한 8~20자'}
          onChange={(v) => handleChange('password', v)}
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
        <PasswordField
          value={form.confirmPassword}
          placeholder={'영문자,숫자,특수문자를 포함한 8~20자'}
          onChange={(v) => handleChange('confirmPassword', v)}
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
