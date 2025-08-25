import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FIRST_STEP_NUM, TOTAL_STEP_NUM } from '@/constants/admin/add/AdminStayAdd';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ClampProps = {
  n: number;
  min?: number;
  max?: number;
};

export const clampNum = ({ n, min = FIRST_STEP_NUM, max = TOTAL_STEP_NUM }: ClampProps) =>
  Math.max(min, Math.min(max, n));
