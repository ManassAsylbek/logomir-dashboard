export interface Lesson {
  id: number;
  name: string | null;
  user: number | null;
  lesson_type: "online" | "offline" | string | null;
  description: string | null;
  record_file: string | null;
  user_tariff: number | null;
  time_slot: number | null;
  branch_name: string | null;
  specialist_id: number | null;
  start_time: string | null;
  end_time: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CreateLessonRequest {
  name: string;
  user: number;
  lesson_type: "online" | "offline";
  description?: string;
  user_tariff?: number;
  time_slot?: number;
}

export interface LessonsListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Lesson[];
}
