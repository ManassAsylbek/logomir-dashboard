export interface Tariff {
  id: number;
  name: string;
  price: number;
  description?: string | null;
  time?: string | null;
  image?: string | null;
  lesson_count: number;
  created_at?: string | null;
  updated_at?: string | null;
}

export type TariffsResponse =
  | Tariff[]
  | {
      count: number;
      next: string | null;
      previous: string | null;
      results: Tariff[];
    };
