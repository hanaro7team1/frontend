import { Input, Txt } from '@/components/atoms';

export default function AddOwner() {
  return (
    <>
      <Txt align='left'>사랑방 주인의 성함은 무엇인가요</Txt>
      <div className='mb-10 flex gap-4'>
        <Input placeholder={''} />
        <Txt align='left' size={25} className='pr-30'>
          님
        </Txt>
      </div>
      <Txt align='left'>사랑방의 최대 수용 가능 인원은 몇 명인가요</Txt>
      <Input placeholder='예시) 01012345567' />
    </>
  );
}
