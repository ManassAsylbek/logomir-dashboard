export interface Presentation {
  id: number;
  name: string;
  file: string;
  description: string;
  link: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePresentationRequest {
  name: string;
  description: string;
  link?: string;
  file?: File | null;
}

export interface UpdatePresentationRequest {
  name?: string;
  description?: string;
  link?: string;
  file?: File | null;
}

export interface PresentationListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Presentation[];
}
