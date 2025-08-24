'use client';

import { cn } from '@/lib/utils';
import { Txt } from '.';

const BgColor = {
  green: 'bg-green-49d',
  pink: 'bg-pink-a76/70',
  gray: 'bg-black-626/40',
};

type Props = {
  title: string;
  className?: string;
  color?: keyof typeof BgColor;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
};

/**
 * 버튼 컴포넌트
 * title: 버튼 텍스트
 * color: 버튼 색상 (기본: green)
 * onClick: 버튼 클릭 이벤트
 * disabled: 버튼 비활성화 여부
 * type: 버튼 타입
 * icon: 텍스트 옆에 아이콘이 있는 버튼 (왼쪽 고정)
 * className: 추가 스타일 클래스
 */
export default function Button({
  title,
  color = 'green',
  onClick,
  disabled = false,
  type = 'button',
  icon,
  className,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        'relative flex w-full items-center justify-center rounded-[10px] py-[11px]',
        BgColor[color],
        {
          'opacity-50': disabled,
          'cursor-pointer': !disabled,
        },
        className,
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {icon && <span className='absolute left-6 flex items-center'>{icon}</span>}

      <Txt className='text-white' size={24}>
        {title}
      </Txt>
    </button>
  );
}
