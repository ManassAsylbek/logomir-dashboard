import { AxiosResponse } from "axios";

import { requester } from "../axios";

import { Achievement, AchievementFormPayload } from "./types";

const buildFormData = (data: AchievementFormPayload) => {
  const fd = new FormData();

  fd.append("name", data.name);
  if (data.description !== undefined) fd.append("description", data.description);
  if (data.category) fd.append("category", data.category);
  if (data.points !== undefined) fd.append("points", String(data.points));
  if (data.icon) fd.append("icon", data.icon, "icon.png");

  return fd;
};

export const createAchievement = (
  data: AchievementFormPayload,
): Promise<AxiosResponse<Achievement>> => {
  return requester.post<Achievement>(
    `/activity/achievements/`,
    buildFormData(data),
    { headers: { "Content-Type": "multipart/form-data" } },
  );
};
