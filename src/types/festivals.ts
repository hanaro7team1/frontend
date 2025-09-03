import { Paged } from "./common";

export type FestivalListItemResponse = {
    id: number;
    img: string;
    title: string;
    startDate: string;
    endDate: string;
    city: string;
};
export type FestivalListResponse = Paged<FestivalListItemResponse>;