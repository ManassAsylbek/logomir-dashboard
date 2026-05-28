export type LessonType = "online" | "offline";

export type LessonStatus =
  | "scheduled"
  | "completed"
  | "cancelled"
  | string;

export interface Lesson {
  id: number;
  name: string | null;
  user: number | null;
  lesson_type: LessonType | string | null;
  lesson_status?: LessonStatus | null;
  description: string | null;
  record_file: string | null;
  user_tariff: number | null;
  time_slot: number | null;
  branch: number | null;
  branch_name: string | null;
  specialist_id: number | null;
  meet_link?: string | null;
  start_time: string | null;
  end_time: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CreateLessonRequest {
  name: string;
  user: number;
  lesson_type: LessonType;
  description?: string;
  user_tariff?: number;
  time_slot?: number;
  branch?: number;
}

export interface RescheduleLessonRequest {
  time_slot: number;
}

export interface ChangeLessonTypeRequest {
  lesson_type: LessonType;
  branch?: number;
}

export interface ChangeLessonBranchRequest {
  branch: number;
}

export interface LessonsListParams {
  page?: number;
  user?: number;
  lesson_type?: LessonType;
  lesson_status?: LessonStatus;
  branch?: number;
  time_slot__specialist?: number;
  time_slot__start_time__gte?: string;
  time_slot__start_time__lte?: string;
}

export interface LessonsListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Lesson[];
}
