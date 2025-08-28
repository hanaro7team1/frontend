'use client';

import { CityActionBar, CountrysideActionBar } from '@/components/domain/stays';

type Props = {
  id: string;
  mode: 'city' | 'countryside';
  onReserve?: () => void;
  onInquiry?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function StayActionBar({ mode = 'city', ...props }: Props) {
  if (mode === 'city') {
    return <CityActionBar {...props} />;
  }
  return <CountrysideActionBar {...props} />;
}
