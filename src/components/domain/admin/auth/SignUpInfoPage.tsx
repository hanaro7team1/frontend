import { Input, Txt } from '@/components/atoms';

export default function SignUpInfoPage() {
  return (
    <div className='flex flex-col gap-10'>
      <div className='gap-5'>
        <Txt size={24}>마을 이름</Txt>
        <Input placeholder={'마을 이름을 입력해 주세요 '} />
      </div>
      <div className='gap-5'>
        <Txt size={24}>지역 주소</Txt>
        <Input placeholder={'지역 주소를 선택해 주세요 '} />
      </div>
      <div className='gap-5'>
        <Txt size={24}>관리자 전화번호</Txt>
        <Input placeholder={'010-1234-5678'} />
      </div>
    </div>
  );
}
