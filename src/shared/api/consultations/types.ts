export type ConsultationFormat = "online" | "offline";

export type ConsultationStatus =
  | "new"
  | "contacted"
  | "scheduled"
  | "rejected"
  | "converted";

export const CONSULTATION_STATUS_LABELS: Record<ConsultationStatus, string> = {
  new: "Новая",
  contacted: "Связались",
  scheduled: "Записан",
  rejected: "Отказ",
  converted: "Конвертирован",
};

export const CONSULTATION_FORMAT_LABELS: Record<ConsultationFormat, string> = {
  online: "Онлайн",
  offline: "Оффлайн",
};

export interface ConsultationRequest {
  id: number;
  full_name: string;
  phone: string;
  child_name?: string | null;
  child_age?: number | null;
  format: ConsultationFormat;
  format_display?: string;
  branch?: number | null;
  branch_name?: string | null;
  desired_datetime?: string | null;
  message?: string | null;
  source?: string | null;
  status: ConsultationStatus;
  status_display?: string;
  specialist?: number | null;
  specialist_name?: string | null;
  scheduled_datetime?: string | null;
  processed_by?: number | null;
  processed_by_name?: string | null;
  processed_at?: string | null;
  note?: string | null;
  linked_user?: number | null;
  linked_consultation?: number | null;
  created_at: string;
  updated_at: string;
}

export interface CreateConsultationRequest {
  full_name: string;
  phone: string;
  format: ConsultationFormat;
  branch?: number | null;
  desired_datetime?: string;
  child_name?: string;
  child_age?: number | null;
  message?: string;
  /** Honeypot — must be sent empty. Bots tend to fill it. */
  website: string;
}

export interface UpdateConsultationRequest {
  status?: ConsultationStatus;
  specialist?: number | null;
  scheduled_datetime?: string | null;
  note?: string;
}

export interface ConsultationsListParams {
  page?: number;
  status?: ConsultationStatus;
  format?: ConsultationFormat;
  branch?: number;
  source?: string;
  search?: string;
  ordering?: string;
  created_at__gte?: string;
  created_at__lte?: string;
  created_at__date?: string;
}

export interface ConsultationsListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ConsultationRequest[];
}
