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
