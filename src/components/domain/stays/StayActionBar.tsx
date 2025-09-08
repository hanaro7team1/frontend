'use client';

import { CityActionBar, CountrysideActionBar } from '@/components/domain/stays';

type Props = {
  id: number;
  mode: 'city' | 'countryside';
  onReserve?: () => void;
  onInquiry?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  schedule?: string;
  peopleCount?: string;
  capacity: number;
};

export default function StayActionBar({ mode = 'city', ...props }: Props) {
  if (mode === 'city') {
    return <CityActionBar {...props} />;
  }
  return <CountrysideActionBar {...props} />;
}
