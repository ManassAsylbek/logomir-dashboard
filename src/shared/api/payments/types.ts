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
