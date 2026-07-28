import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { Achievement, AchievementFormPayload } from "./types";

export const updateAchievement = (
  id: number,
  data: Partial<AchievementFormPayload>,
): Promise<AxiosResponse<Achievement>> => {
  const fd = new FormData();

  if (data.name !== undefined) fd.append("name", data.name);
  if (data.description !== undefined) fd.append("description", data.description);
  if (data.category !== undefined) fd.append("category", data.category);
  if (data.points !== undefined) fd.append("points", String(data.points));
  if (data.icon) fd.append("icon", data.icon, "icon.png");

  return requester.patch<Achievement>(`/activity/achievements/${id}/`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
