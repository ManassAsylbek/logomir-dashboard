export interface AnalyticsParams {
  date_from?: string;
  date_to?: string;
}

export interface KpiMetric {
  value: number;
  delta: number;
}

export interface DashboardKpi {
  success_rate: KpiMetric;
  upcoming_lessons: KpiMetric;
  active_students: KpiMetric;
  revenue_usd: KpiMetric;
}

export interface LessonTypeShare {
  label: string;
  percent: number;
}

export interface UpcomingLesson {
  id: number;
  student_name: string | null;
  start_time: string | null;
  lesson_type: string | null;
}

export interface WeeklyActivityPoint {
  day: string;
  lessons_count: number;
}

export interface DashboardAnalytics {
  kpi: DashboardKpi;
  lesson_types: LessonTypeShare[];
  upcoming_lessons: UpcomingLesson[];
  weekly_activity: WeeklyActivityPoint[];
}

export type TransactionStatus = "paid" | "pending" | "failed";

export interface PaymentsTotals {
  total_som: number;
  total_usd: number;
  transactions_count: number;
  avg_payment_som: number;
}

export interface MonthlyPoint {
  month: string;
  som: number;
  usd: number;
  transactions: number;
}

export interface RecentTransaction {
  id: string;
  student_name: string | null;
  amount_som: number;
  amount_usd: number;
  status: TransactionStatus;
  date: string;
}

export interface PaymentsAnalytics {
  totals: PaymentsTotals;
  monthly: MonthlyPoint[];
  recent_transactions: RecentTransaction[];
}
