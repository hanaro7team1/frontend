import { Paged } from './common';

export type RealEstatesSearchParams = {
  location?: string;
  tradeType?: '전세' | '매매';
  priceRange?: string;
};

export type EstatesItemResponse = {
  id: string;
  location: string;
  price: string;
  tradeType: '매매' | '전세';
  imageUrls: string[];
  capacity: number;
  area: number;
  description: string;
  areaSize: number;
  roomCount: number;
  house: string;
};

export type EstatesListItemResponse = {
  id: string;
  location: string;
  price: string;
  tradeType: '매매' | '전세';
  imageUrl: string;
};
export type EstatesListResponse = Paged<EstatesListItemResponse>;
