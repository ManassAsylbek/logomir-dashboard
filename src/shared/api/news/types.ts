export interface News {
  id: number;
  title: string;
  description: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateNewsRequest {
  title: string;
  description: string;
  image?: File | null;
}

export interface UpdateNewsRequest {
  title?: string;
  description?: string;
  image?: File | null;
}

export interface NewsListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: News[];
}
