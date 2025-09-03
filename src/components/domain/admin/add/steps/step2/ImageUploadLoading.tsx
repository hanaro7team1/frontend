import { Txt } from '@/components/atoms';
import GifLoader from '@/components/common/GifLoaders';

export default function ImgLoading() {
  return (
    <div className='fixed inset-0 z-10 flex flex-col items-center justify-center bg-white'>
      <Txt size={22} align='center'>
        사진을 업로드 중이에요 <br /> 잠시만 기다려 주세요!
      </Txt>
      <GifLoader path={'/loaders/spin.gif'} size={100} />
    </div>
  );
}
