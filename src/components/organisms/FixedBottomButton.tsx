'use client';

import { PropsWithChildren } from 'react';
import { Button } from '../molecules';

type Props = {
  greenBtnText: string;
  grayBtnText?: string;
  onClickGreenBtn: () => void;
  onClickGrayBtn?: () => void;
  greenBtnType?: 'button' | 'submit' | 'reset';
};
/**
 * 하단 고정 버튼 컴포넌트 (스크롤 있을 때도 고정)
 * @param greenBtnText - 초록색 버튼 안에 들어갈 텍스트
 * @param grayBtnText - 회색 버튼 안에 들어갈 텍스트 (값 없을 시 회색 버튼 안 보임)
 * @param onClickGreenBtn - 초록색 버튼 클릭 시 실행될 핸들러
 * @param onClickGrayBtn - 회색 버튼 클릭 시 실행될 핸들러
 * @param greenBtnType - 초록색 버튼의 타입 (회색 버튼은 'button' 고정)
 * @returns
 */
export default function FixedBottomButton({
  greenBtnText,
  grayBtnText,
  onClickGreenBtn,
  onClickGrayBtn,
  greenBtnType = 'button',
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className='border-black-626/15 fixed inset-x-0 bottom-0 z-50 mx-auto flex flex-col gap-4 border bg-white p-4 sm:max-w-sm'>
      {children}
      <div className='flex gap-4'>
        {grayBtnText && <Button title={grayBtnText} color='gray' onClick={onClickGrayBtn} />}
        <Button title={greenBtnText} type={greenBtnType} onClick={onClickGreenBtn} />
      </div>
    </div>
  );
}
