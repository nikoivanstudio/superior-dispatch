type DispatchMeta = {
  code: number;
  request_id: string;
};

type DispatchPagination = {
  previous: string | null;
  next: string | null;
};

export type DispatchEntityResponse<T> = {
  meta: DispatchMeta;
  data: T[];
  pagination: DispatchPagination;
};
