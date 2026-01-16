export interface News {
  id: number;
  name: string;
  decription: string;
  link?: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateNewsRequest {
  name: string;
  decription: string;
  link?: string;
  image?: File | null;
}

export interface UpdateNewsRequest {
  name?: string;
  decription?: string;
  link?: string;
  image?: File | null;
}

export interface NewsListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: News[];
}
