import { Home, MapPinHouse, MoonStar, PartyPopper } from 'lucide-react';

export const TAB_ICON_SIZE = 30;
export const TAB_TEXT_SIZE = 18;
export const TAB_SELECTED_COLOR = 'var(--code-theme1)';
export const TAB_DEFAULT_COLOR = 'var(--code-theme7)';

export const TABS = {
  메인: { route: '/', icon: Home },
  숙박: { route: '/stays', icon: MoonStar },
  매물: { route: '/realEstates', icon: MapPinHouse },
  축제: { route: '/festivals', icon: PartyPopper },
} as const;
