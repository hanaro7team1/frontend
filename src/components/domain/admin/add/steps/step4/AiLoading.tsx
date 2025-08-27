import Image from 'next/image';
import { Txt } from '@/components/atoms';
import GifLoader from '@/components/common/GifLoaders';

export default function AiLoading() {
  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center'>
      <Txt size={22}>
        입력하신 정보를 바탕으로 <br /> 사랑방 소개글을 작성하고 있어요!
      </Txt>
      <GifLoader path={'/loaders/dot.gif'} size={100} />
      <Image
        src='/images/Img_AI_loading.svg'
        width={200}
        height={200}
        alt='양복을 입은 별돌이가 AI를 이용하고 있다'
        className=''
      />
    </div>
  );
}
