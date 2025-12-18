export interface Specialist {
  id: number;
  name: string | null;
  last_name: string | null;
  phone_number: string | null;
  image: string | null;
  description: string | null;
  raiting: number | null;
  created_at: string | null;
  updated_at: string | null;
  user: number | null;
  branch: number | null;
}

export interface CreateSpecialistRequest {
  name?: string;
  last_name?: string;
  phone_number?: string;
  description?: string;
  raiting?: number;
  user?: number;
  branch?: number;
}

export interface UpdateSpecialistRequest {
  name?: string;
  last_name?: string;
  phone_number?: string;
  description?: string;
  raiting?: number;
  user?: number;
  branch?: number;
}

export interface SpecialistsListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Specialist[];
}
