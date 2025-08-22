import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  onClick?: () => void;
  className?: string;
};

/**
 * 그림자 테두리가 있는 레이아웃 컴포넌트
 * @param onClick - 클릭 이벤트 핸들러
 * @param className - 추가 스타일 클래스
 * @children - 레이아웃 안에 렌더링할 자식 요소
 */
export default function ShadowBox({
  onClick,
  className,
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex w-full flex-col overflow-hidden rounded-[10px] shadow-[0_0_5px_rgba(0,0,0,0.25)]',
        {
          'cursor-pointer': onClick,
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
