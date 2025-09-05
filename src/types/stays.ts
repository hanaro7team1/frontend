import { ReactElement } from 'react';
import { Paged } from './common';

export type RoomInfo = {
  id: number;
  name: string;
  location: string;
  hostName?: string;
  status: '예약 가능' | '예약 마감' | '예약 닫힘';
  imgUrl: string;
};

export type RoomType = '하숙형' | '독립형';
export type StaysSearchParams = {
  roomType?: RoomType;
  location?: string;
  schedule?: string;
  peopleCount?: string;
};

export type RoomStatus = '예약 가능' | '예약 마감' | '예약 닫힘';
export type AdminStaysSearchParams = {
  roomStatus?: RoomStatus | '전체';
};

export type OptionFilter = {
  key: string;
  label: string;
  valueSize?: number;
  defaultValue: string;
  BottomSheetType: ReactElement;
};

export type StayDetailResponseType = {
  id: number;
  title: string;
  address: string;
  detailAddress: string;
  capacity: number;
  areaSize: number;
  description: string;
  isHomestay: boolean;
  isActiveMsg: string;
  images: string[];
};

export type StayListItemResponse = {
  id: number;
  imageURL: string;
  address: string;
  title: string;
  stayResrvStatus: '예약 가능' | '예약 마감' | '예약 닫힘';
};
export type StayListResponse = Paged<StayListItemResponse>;

export type StayPatchResponse = {
  capacity: number;
  areaSize: number;
  description: string;
};

export type AdminStayListItemResponse = {
  hostName: string;
} & Omit<StayListItemResponse, 'address'>;
export type AdminStayListResponse = Paged<AdminStayListItemResponse>;

export type PreviewImageItem = {
  id: string;
  file: File;
  previewUrl: string;
};
export type PresignResp = { url: string; key: string };
