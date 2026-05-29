export interface Branch {
  id: number;
  name: string | null;
  address?: string | null;
  city?: string | null;
  phone_number?: string | null;
  description?: string | null;
  link?: string | null;
  photo?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface BranchesListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Branch[];
}
