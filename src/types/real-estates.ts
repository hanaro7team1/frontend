import { Paged } from './common';

export type RealEstatesSearchParams = {
  location?: string;
  tradeType?: '전세' | '매매';
  priceRange?: string;
};

export type EstatesListItemResponse = {
  id: string;
  address: string;
  price: number;
  tradeType: '매매' | '전세';
  imageUrls: string;
};
export type EstatesListResponse = Paged<EstatesListItemResponse>;
