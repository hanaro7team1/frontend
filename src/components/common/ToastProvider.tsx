'use client';

import Image from 'next/image';
import { PropsWithChildren, useState } from 'react';
import { cn } from '@/lib/utils';
import { Txt } from '@/components/atoms';
import { ToastType } from '@/types/toast';
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

/**
 * ToastProvider는 ToastContext를 제공하는 컴포넌트
 */
export function ToastProvider({ children, className }: PropsWithChildren<Props>) {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState(className);
  const [toastType, setToastType] = useState<ToastType>('success');
  const [isAnimating, setIsAnimating] = useState(false);

  const showToast = (msg: string, customPosition?: string, type: ToastType = 'success') => {
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
            'fixed top-1/2 left-1/2 z-1000 -translate-x-1/2 transform transition-all duration-150',
            position,
            isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
          )}
        >
          {/* Toast UI */}
          <div className='flex min-w-fit flex-nowrap items-center gap-[5px] rounded-[6px] bg-white px-[13px] py-[5px] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.15)]'>
            <Image
              src={iconSrcMap[toastType]}
              alt='check'
              width={17}
              height={17}
              className='flex-shrink-0'
            />
            <Txt size={15} weight='medium' className='text-blue-9a0 whitespace-nowrap'>
              {message}
            </Txt>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
