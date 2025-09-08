import { Input, Txt } from '@/components/atoms';
import { useDaumPostcodePopup } from '@/hooks/stays/useDaumPostcodePopup';
import { formatPhone } from '@/utils/common/phoneHyphen';
import { useSignUpForm } from '@/contexts/SignUpFormContext';
import { SearchButton } from '../add/steps/step1/SearchButton';

export default function SignUpInfoPage() {
  const { form, setForm, handleChange } = useSignUpForm();

  const { ready, open } = useDaumPostcodePopup();

  const handleOpenPostcode = () => {
    open(({ address }) => {
      setForm((prev) => ({
        ...prev,
        region: address,
      }));
    });
  };

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center gap-2'>
          <Txt size={24}>마을 이름</Txt>
          <Txt size={18} className='text-pink-a76'>
            *필수
          </Txt>
        </div>
        <Input
          placeholder={'마을 이름을 입력해 주세요 '}
          value={form.villageName}
          onChange={(e) => handleChange('villageName', e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center gap-2'>
          <Txt size={24}>지역 주소</Txt>
          <Txt size={18} className='text-pink-a76'>
            *필수
          </Txt>
        </div>
        <div className='flex gap-2'>
          <Input
            placeholder={'우측 버튼을 누르고 주소를 찾아 주세요 '}
            value={form.region}
            readOnly
          />
          <SearchButton disabled={!ready} onClick={handleOpenPostcode} />
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center gap-2'>
          <Txt size={24}>관리자 전화번호</Txt>
          <Txt size={18} className='text-pink-a76'>
            *필수
          </Txt>
        </div>
        <Input
          placeholder={'예) 010-1234-5678'}
          value={formatPhone(form.phone)}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>
    </div>
  );
}
