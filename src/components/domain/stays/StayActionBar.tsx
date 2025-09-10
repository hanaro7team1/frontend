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
  title: string;
};

export default function StayActionBar({ mode = 'city', ...props }: Props) {
  const storedUser = localStorage.getItem('user');

  let countryName = 'noname';
  if (storedUser) {
    const user = JSON.parse(storedUser);
    countryName = user.name;
  }

  const isCountryAdmins = props.title.startsWith(countryName);

  if (mode === 'city') {
    return <CityActionBar {...props} />;
  }

  if (isCountryAdmins) {
    return <CountrysideActionBar {...props} />;
  }
}
