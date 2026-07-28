export interface Student {
  id: number;
  username: string;
  full_name: string;
  phone_number: string;
  avatar: string | null;
  age: number;
  gender: "Male" | "Female";
  tariff: number;
  is_child: boolean;
  roles: string;
}

export interface StudentsListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Student[];
}
