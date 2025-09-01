import { lgBtn_PATHS, pinkBtn_PATHS, smBtn_PATHS } from '@/constants/common/bottomSheetTrigger';

/**
 * pathname으로 TriggerButton style을 제어하는 함수
 * @param pathname
 * @returns btnStyle, textSize, text
 */
export const getStyleAndtextSize = (pathname: string) => {
  if (lgBtn_PATHS.some((regex) => regex.test(pathname))) {
    return { btnStyle: 'rounded-[10px] py-2.5', textSize: 20 };
  }

  if (smBtn_PATHS.some((regex) => regex.test(pathname))) {
    return { btnStyle: 'px-3.5 py-1.5', textSize: 16 };
  }

  if (pinkBtn_PATHS.includes(pathname)) {
    return {
      btnStyle:
        'whitespace-pre-line bg-pink-09f flex-1 flex h-[50px] w-full items-center justify-center rounded-[10px] px-0',
      textSize: 16,
      text: `예약 가능 날짜\n 변경하기`,
    };
  }

  return { btnStyle: '', textSize: 18 };
};
