import { cn } from '@/lib/utils';
import {
  TABS,
  TAB_DEFAULT_COLOR,
  TAB_ICON_SIZE,
  TAB_SELECTED_COLOR,
  TAB_TEXT_SIZE,
} from '@/constants/common/BottomTabNav';
import { Txt } from '../atoms';

type TabName = keyof typeof TABS;

type BottomTabNavBtnProps = {
  tabName: TabName;
  isSelected: boolean;
  onClick: () => void;
};

export default function BottomTabNavBtn({ tabName, isSelected, onClick }: BottomTabNavBtnProps) {
  const { icon: Icon } = TABS[tabName];

  return (
    <button className='flex flex-col items-center px-6' onClick={onClick}>
      <Icon size={TAB_ICON_SIZE} color={isSelected ? TAB_SELECTED_COLOR : TAB_DEFAULT_COLOR} />
      <Txt
        size={TAB_TEXT_SIZE}
        className={cn('text-gray-070', {
          'text-green-49d': isSelected,
        })}
      >
        {tabName}
      </Txt>
    </button>
  );
}
