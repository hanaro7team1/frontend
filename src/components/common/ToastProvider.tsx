'use client';

import Image from 'next/image';
import { PropsWithChildren, useState } from 'react';
import { cn } from '@/lib/utils';
import { Txt } from '@/components/atoms';
import { ToastPosition, ToastType } from '@/types/toast';
import { ToastContext } from './ToastContext';

type Props = {
  className?: string;
};

//성공, 실패, 경고 세 가지로 토스트 이미지 확장
const iconSrcMap: Record<ToastType, string> = {
  success: '/icons/Ic-Check.svg',
  error: '/icons/Ic-Error.svg',
  warning: '/icons/Ic-Warning.svg',
};

// 위치 (상단 중단 하단)
const positionMap: Record<ToastPosition, string> = {
  top: 'top-1/3',
  middle: 'top-1/2 -translate-y-1/2',
  bottom: 'top-4/5',
} as const;

/**
 * ToastProvider는 ToastContext를 제공하는 컴포넌트
 */
export function ToastProvider({ children }: PropsWithChildren<Props>) {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState<ToastPosition>('bottom');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [isAnimating, setIsAnimating] = useState(false);

  const showToast = (
    msg: string,
    type: ToastType = 'success',
    customPosition: ToastPosition = 'bottom',
  ) => {
    setMessage(msg);
    setToastType(type);
    if (customPosition) {
      setPosition(customPosition);
    }
    setIsAnimating(true);
    setIsVisible(true);

    setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setIsVisible(false);
      }, 150);
    }, 1500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isVisible && (
        <div
          className={cn(
            'fixed z-1000 transform transition-all duration-150',
            positionMap[position],
            isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
          )}
        >
          {/* Toast UI */}
          <div className='bg-gray-070/70 flex w-full items-center gap-4 rounded-lg px-4 py-3 shadow-[0px_0px_5px_0px_rgba(0,0,0,0.15)] backdrop-blur-md'>
            <Image
              src={iconSrcMap[toastType]}
              alt='check'
              width={28}
              height={28}
              className='flex-shrink-0'
            />
            <Txt size={22} className='whitespace-pre-line text-white'>
              {message}
            </Txt>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
