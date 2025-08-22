'use client';

import { cn } from '@/lib/utils';
import { Txt } from '../atoms';

const Color = {
  green: ['bg-green-49d', 'text-white'],
  gray: ['bg-gray-070', 'text-white'],
  gray40: ['bg-black-626/40', 'text-white'],
  gray50: ['bg-black-626/50', 'text-white'],
};

type Props = {
  title: string;
  className?: string;
  color?: keyof typeof Color;
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
 * icon: 텍스트 옆에 아이콘이 있는 버튼
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
        'flex w-full items-center justify-center rounded-[10px] py-[11px]',
        Color[color][0],
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
      {icon}
      <Txt className={Color[color][1]} size={22}>
        {title}
      </Txt>
    </button>
  );
}
