import { Paged } from "./common";

export type FestivalListResponse = {
    id: number;
    img: string;
    title: string;
    startDate: string;
    endDate: string;
    city: string;
};
export type FestivalsResponse = Paged<FestivalListResponse>;