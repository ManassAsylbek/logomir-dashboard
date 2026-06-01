export type AchievementCategory =
  | "study"
  | "behavior"
  | "activity"
  | "progress"
  | "other";

export const ACHIEVEMENT_CATEGORY_LABELS: Record<AchievementCategory, string> = {
  study: "Учёба",
  behavior: "Поведение",
  activity: "Активность",
  progress: "Прогресс",
  other: "Другое",
};

export interface Achievement {
  id: number;
  name: string;
  description?: string | null;
  icon?: string | null;
  points: number;
  category: AchievementCategory;
  category_display?: string;
  created_by?: number;
  created_by_name?: string | null;
}

export interface AchievementsListParams {
  search?: string;
  category?: AchievementCategory;
  page?: number;
}

export type AchievementsListResponse =
  | Achievement[]
  | {
      count: number;
      next: string | null;
      previous: string | null;
      results: Achievement[];
    };

export interface AchievementFormPayload {
  name: string;
  description?: string;
  category?: AchievementCategory;
  points?: number;
  icon?: Blob | File;
}

export interface UserAchievement {
  id: number;
  user: number;
  achievement: number;
  achievement_detail?: Achievement;
  lesson?: number | null;
  comment?: string | null;
  specialist?: number;
  specialist_name?: string | null;
  awarded_at?: string;
}

export interface UserAchievementsListParams {
  user?: number;
  page?: number;
}

export type UserAchievementsListResponse =
  | UserAchievement[]
  | {
      count: number;
      next: string | null;
      previous: string | null;
      results: UserAchievement[];
    };

export interface CreateUserAchievementRequest {
  user: number;
  achievement: number;
  lesson?: number | null;
  comment?: string;
}
