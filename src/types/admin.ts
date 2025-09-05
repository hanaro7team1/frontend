export type AdminReservationResponse = {
  villageName: string;
  upcomingCnt: number;
  inProgressCnt: number;
  completedCnt: number;
};

export type StayAvailableDatesResponse = {
  yearMonth: string; // "2025-09"
  openDates: string[]; // [ "2025-09" ]
  reservedDates: string[]; // [ "2025-09" ]
  hasOpenPrev: boolean;
  hasOpenNext: boolean;
  hasReservedPrev: boolean;
  hasReservedNext: boolean;
};
