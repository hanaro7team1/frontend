import { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export const alignMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const fontMap = {
  bold: 'font-[Hana2-Bold]',
  cm: 'font-[Hana2-CM]',
  medium: 'font-[Hana2-Medium]',
  regular: 'font-[Hana2-Regular]',
};

type Props = {
  size?: number;
  weight?: keyof typeof fontMap;
  align?: keyof typeof alignMap;
  className?: string;
} & HTMLAttributes<HTMLSpanElement>;

export default function Txt({
  size = 20,
  weight = 'cm',
  align = 'center',
  className,
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <span
      className={cn('text-black-626', fontMap[weight], alignMap[align], className)}
      style={{ fontSize: `${size}px` }}
      {...props}
    >
      {children}
    </span>
  );
}
