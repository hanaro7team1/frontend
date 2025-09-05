import { Paged } from "./common";

export type FestivalListItemResponse = {
    id: number;
    // img: string;
    title: string;
    startDate: string;
    endDate: string;
    city: string;
};
export type FestivalListResponse = Paged<FestivalListItemResponse>;

export type FestivalDetailResponse = {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    street: string;
    price: number;
    url: string;
    // imageUrl: string;
};