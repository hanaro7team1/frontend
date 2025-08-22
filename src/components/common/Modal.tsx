'use client';

import { MouseEventHandler, PropsWithChildren, useEffect, useRef } from 'react';
import { Button, Txt } from '../atoms';

type Props = {
  greenBtnText: string;
  grayBtnText: string;
  onClickGreenBtn: () => void;
  onClickGrayBtn: () => void;
  type?: 'submit';
  disabled?: boolean;
};

/**
 * 공용 모달 컴포넌트
 * @param greenBtnText 초록색 버튼의 텍스트
 * @param grayBtnText 회색 버튼의 텍스트
 * @param onClickGreenBtn 초록색 버튼 클릭 이벤트 함수
 * @param onClickGrayBtn 회색 버튼의 클릭 이벤트 함수
 * @children 하단 두 버튼의 상단 요소. 텍스트/이미지/input 모두 가능. Txt 컴포넌트로 감싸놨으니 텍스트는 더이상 감쌀 필요 없음.
 */
export default function Modal({
  greenBtnText,
  grayBtnText,
  onClickGreenBtn,
  onClickGrayBtn,
  type,
  disabled,
  children,
}: PropsWithChildren<Props>) {
  const overlay = useRef<HTMLDivElement>(null);

  // 모달 바깥 클릭 시 모달 닫기
  const onClickOverlay: MouseEventHandler = (e) => {
    if (e.target === overlay.current) onClickGrayBtn();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClickGrayBtn();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div
      ref={overlay}
      className='bg-black-626/40 fixed inset-0 left-1/2 z-100 w-full -translate-x-1/2 sm:w-sm'
      onClick={onClickOverlay}
    >
      <div className='absolute top-1/2 left-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 rounded-[10px] bg-white p-6 text-center sm:w-[22rem]'>
        {/* 하단 두 버튼의 상단 영역 */}
        <Txt size={24}>{children}</Txt>

        {/* 회색 버튼, 초록색 버튼 */}
        <div className='mt-6 flex gap-3'>
          <Button title={grayBtnText} onClick={onClickGrayBtn} color='gray' />
          <Button title={greenBtnText} onClick={onClickGreenBtn} disabled={disabled} type={type} />
        </div>
      </div>
    </div>
  );
}
