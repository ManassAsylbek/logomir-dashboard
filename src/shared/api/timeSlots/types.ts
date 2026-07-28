export interface TimeSlot {
  id: number;
  specialist: number | null;
  start_time: string | null;
  end_time: string | null;
  is_booked: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface TimeSlotsListParams {
  page?: number;
  specialist?: number;
  is_booked?: boolean;
  start_time__gte?: string;
  start_time__lte?: string;
}

export interface TimeSlotsListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TimeSlot[];
}
