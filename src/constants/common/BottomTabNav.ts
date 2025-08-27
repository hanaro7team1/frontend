import { Home, MapPinHouse, MoonStar, PartyPopper } from 'lucide-react';

export const TAB_ICON_SIZE = 30;
export const TAB_TEXT_SIZE = 18;
export const TAB_SELECTED_COLOR = 'var(--code-theme1)';
export const TAB_DEFAULT_COLOR = 'var(--code-theme7)';

export const TABS = [
  { label: '메인', route: '/main', icon: Home },
  { label: '숙박', route: '/stays', icon: MoonStar },
  { label: '매물', route: '/real-estates', icon: MapPinHouse },
  { label: '축제', route: '/festivals', icon: PartyPopper },
] as const;
