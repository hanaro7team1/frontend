export type AdminReservationResponse = {
  villageName: string;
  upcomingCnt: number;
  inProgressCnt: number;
  completedCnt: number;
};

export type AdminStayAvailableDatesResponse = {
  openDates: string[]; // [ "2025-09" ]
  reservedDates: string[]; // [ "2025-09" ]
};

export type StayPreview = {
  address: string;
  detailAddress: string;
  capacity: number;
  areaSize: number;
  hostName: string;
  hostPhone: string;
  description: string;
  s3Keys: string[];
  images: string[];
};

export type StayCreatePayload = Omit<StayPreview, 'images'>;
