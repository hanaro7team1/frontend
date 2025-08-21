import {
  ChangeEventHandler,
  InputHTMLAttributes,
  KeyboardEventHandler,
  Ref,
  TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/lib/utils';

// input 컴포넌트의 기본 스타일
const baseStyle = `
  w-full px-4 py-3 rounded-[10px]
  bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.15)]
  font-[Hana2-CM] text-black-626 placeholder:text-black-626/40
  focus:outline-none focus:ring-0
`;

// textarea 컴포넌트의 기본 스타일
const textAreaStyle = 'flex h-[230px]';

type Props = {
  placeholder: string;
  tag?: 'input' | 'textarea';
  className?: string;
  customRef?: Ref<HTMLInputElement> | Ref<HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>;
/**
 * @param placeholder - placeholder 안내 문구
 * @param tag - 사용할 태그 ('input' 또는 'textarea')
 * @param className - 추가 스타일 클래스
 * @param customRef - ref 속성
 * @param props - 입력 컴포넌트 속성
 */
export default function Input({
  placeholder,
  tag = 'input',
  customRef,
  className,
  ...props
}: Props) {
  if (tag === 'textarea') {
    return (
      <textarea
        ref={customRef as Ref<HTMLTextAreaElement>}
        placeholder={placeholder}
        className={cn(baseStyle, textAreaStyle, className)}
        {...props}
      />
    );
  }

  return (
    <input
      ref={customRef as Ref<HTMLInputElement>}
      placeholder={placeholder}
      className={cn(baseStyle, className)}
      {...props}
    />
  );
}
