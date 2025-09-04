import { Input, Txt } from '@/components/atoms';
import { formatPhone } from '@/utils/common/phoneHyphen';
import { useSignUpForm } from '@/contexts/SignUpFormContext';

export default function SignUpInfoPage() {
  const { form, handleChange } = useSignUpForm();

  return (
    <div className='flex flex-col gap-10'>
      <div className='gap-5'>
        <Txt size={24}>마을 이름</Txt>
        <Input
          placeholder={'마을 이름을 입력해 주세요 '}
          value={form.villageName}
          onChange={(e) => handleChange('villageName', e.target.value)}
        />
      </div>
      <div className='gap-5'>
        <Txt size={24}>지역 주소</Txt>
        <Input
          placeholder={'지역 주소를 선택해 주세요 '}
          value={form.region}
          onChange={(e) => handleChange('region', e.target.value)}
        />
      </div>
      <div className='gap-5'>
        <Txt size={24}>관리자 전화번호</Txt>
        <Input
          placeholder={'예) 010-1234-5678'}
          value={formatPhone(form.phone)}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>
    </div>
  );
}
