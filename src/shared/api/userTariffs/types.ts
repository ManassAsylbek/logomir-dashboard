export interface UserTariff {
  id: number;
  tariff: number;
  tariff_name: string | null;
  lessons_total: number;
  lessons_used: number;
  lessons_left: number;
  purchased_at?: string | null;
}

export interface CreateUserTariffRequest {
  user: number;
  tariff: number;
  lessons_total?: number;
}

export type UserTariffsResponse =
  | UserTariff[]
  | {
      count: number;
      next: string | null;
      previous: string | null;
      results: UserTariff[];
    };
