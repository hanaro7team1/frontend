export type Paged<T> = {
  dtoList: T[];
  hasNext: boolean;
};

export type PageParams = {
  page?: number;
  listSize?: number;
};
