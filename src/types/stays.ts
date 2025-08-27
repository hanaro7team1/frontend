import { ReactElement } from 'react';

export type StaysSearchParams = {
  roomType?: RoomType;
  location?: string;
  schedule?: string;
  peopleCount?: string;
};

export type RoomType = '하숙형' | '독립형';
export type RoomStatus = '예약 가능' | '예약 마감' | '예약 닫힘';

export type StayOptionFilter = {
  key: string;
  label: string;
  valueSize?: number;
  defaultValue: string;
  BottomSheetType: ReactElement;
};
