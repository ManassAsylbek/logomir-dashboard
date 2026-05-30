export interface Payment {
  id: number;
  amount?: string;
  status?: "pay_pending" | "pending" | "success" | "failed";
  receipt?: string;
  created_at: string;
  updated_at: string;
  lesson_type?: "online" | "offline";
  user?: number;
  tariff?: number;
  specialist?: number;
  first_slot?: number;
}

export interface PaymentListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Payment[];
}

export interface UpdatePaymentRequest {
  status?: "pay_pending" | "pending" | "success" | "failed";
  receipt?: File | null;
}

export interface CreatePaymentRequest {
  user: number;
  tariff: number;
  specialist: number;
  first_slot: number;
  amount: number;
  lesson_type: "online" | "offline";
  status?: "pending";
}

export interface ConfirmPaymentResponse {
  payment: Payment;
  user_tariff?: {
    id: number;
    tariff: number;
    tariff_name: string | null;
    lessons_total: number;
    lessons_used: number;
    lessons_left: number;
    purchased_at?: string | null;
  };
  lesson?: {
    id: number;
    name: string | null;
    lesson_status?: string | null;
    start_time: string | null;
    end_time: string | null;
    branch_name?: string | null;
    meet_link?: string | null;
  };
}
