'use client';

import { PropsWithChildren } from 'react';
import { Button } from '../atoms';

type Props = {
  rightBtnText: string;
  leftBtnText?: string;
  isPink?: boolean;
  onClickRightBtn: () => void;
  onClickLeftBtn?: () => void;
  greenBtnType?: 'button' | 'submit' | 'reset';
};
/**
 * 하단 고정 버튼 컴포넌트 (스크롤 있을 때도 고정)
 * @param rightBtnText - 초록색 버튼 안에 들어갈 텍스트
 * @param leftBtnText - 회색 버튼 안에 들어갈 텍스트 (값 없을 시 회색 버튼 안 보임)
 * @param onClickRightBtn - 초록색 버튼 클릭 시 실행될 핸들러
 * @param onClickLeftBtn - 회색 버튼 클릭 시 실행될 핸들러
 * @param greenBtnType - 초록색 버튼의 타입 (회색 버튼은 'button' 고정)
 * @returns
 */

export default function FixedBottomButton({
  rightBtnText,
  leftBtnText,
  isPink = false,
  onClickRightBtn,
  onClickLeftBtn,
  greenBtnType = 'button',
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className='border-gray-6d6 fixed inset-x-0 bottom-0 z-50 mx-auto flex flex-col gap-4 border bg-white p-4 sm:max-w-sm'>
      {children}
      <div className='flex gap-4'>
        {leftBtnText && <Button title={leftBtnText} color='gray' onClick={onClickLeftBtn} />}
        <Button
          title={rightBtnText}
          type={greenBtnType}
          onClick={onClickRightBtn}
          color={isPink ? 'pink' : 'green'}
        />
      </div>
    </div>
  );
}
