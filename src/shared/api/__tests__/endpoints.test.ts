import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("@/shared/api/axios", () => ({
  requester: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

import { requester } from "@/shared/api/axios";
import { getBranches } from "@/shared/api/branches/getBranches";
import { getTariffs } from "@/shared/api/tariffs/getTariffs";
import { getUserTariffs } from "@/shared/api/userTariffs/getUserTariffs";
import { createUserTariff } from "@/shared/api/userTariffs/createUserTariff";
import { getLessons } from "@/shared/api/lessons/getLessons";
import { createLesson } from "@/shared/api/lessons/createLesson";
import { createLessonsBulk } from "@/shared/api/lessons/createLessonsBulk";
import { rescheduleLesson } from "@/shared/api/lessons/rescheduleLesson";
import { changeLessonType } from "@/shared/api/lessons/changeLessonType";
import { changeLessonBranch } from "@/shared/api/lessons/changeLessonBranch";
import { deleteLesson } from "@/shared/api/lessons/deleteLesson";
import { getTimeSlots } from "@/shared/api/timeSlots/getTimeSlots";
import { getDashboardAnalytics } from "@/shared/api/analytics/getDashboardAnalytics";
import { getPaymentsAnalytics } from "@/shared/api/analytics/getPaymentsAnalytics";

const get = vi.mocked(requester.get);
const post = vi.mocked(requester.post);
const patch = vi.mocked(requester.patch);
const del = vi.mocked(requester.delete);

beforeEach(() => {
  vi.clearAllMocks();
  get.mockResolvedValue({ data: {} } as any);
  post.mockResolvedValue({ data: {} } as any);
  patch.mockResolvedValue({ data: {} } as any);
  del.mockResolvedValue({ data: {} } as any);
});

describe("branches API", () => {
  it("GETs /activity/branches/ with page", async () => {
    await getBranches(2);
    expect(get).toHaveBeenCalledWith("/activity/branches/", {
      params: { page: 2 },
    });
  });
});

describe("tariffs / user-tariffs API", () => {
  it("GETs /mobile/tariffs/", async () => {
    await getTariffs();
    expect(get).toHaveBeenCalledWith("/mobile/tariffs/");
  });

  it("GETs /mobile/user-tariffs/ filtered by user", async () => {
    await getUserTariffs(7);
    expect(get).toHaveBeenCalledWith("/mobile/user-tariffs/", {
      params: { user: 7 },
    });
  });

  it("POSTs a new user tariff", async () => {
    await createUserTariff({ user: 7, tariff: 3 });
    expect(post).toHaveBeenCalledWith("/mobile/user-tariffs/", {
      user: 7,
      tariff: 3,
    });
  });
});

describe("lessons API", () => {
  it("GETs lessons with default page and filters", async () => {
    await getLessons({ user: 7, lesson_status: "scheduled" });
    expect(get).toHaveBeenCalledWith("/activity/lessons/", {
      params: { page: 1, user: 7, lesson_status: "scheduled" },
    });
  });

  it("POSTs a single lesson", async () => {
    const payload = {
      name: "L",
      user: 7,
      lesson_type: "online" as const,
      time_slot: 12,
    };

    await createLesson(payload);
    expect(post).toHaveBeenCalledWith("/activity/lessons/", payload);
  });

  it("POSTs a bulk booking", async () => {
    const payload = {
      user: 7,
      lesson_type: "online" as const,
      time_slots: [1, 2, 3],
      name: "Курс",
    };

    await createLessonsBulk(payload);
    expect(post).toHaveBeenCalledWith("/activity/lessons/bulk/", payload);
  });

  it("POSTs reschedule / change-type / change-branch to the right action URLs", async () => {
    await rescheduleLesson(5, { time_slot: 15 });
    expect(post).toHaveBeenCalledWith("/activity/lessons/5/reschedule/", {
      time_slot: 15,
    });

    await changeLessonType(5, { lesson_type: "offline", branch: 2 });
    expect(post).toHaveBeenCalledWith("/activity/lessons/5/change-type/", {
      lesson_type: "offline",
      branch: 2,
    });

    await changeLessonBranch(5, { branch: 2 });
    expect(post).toHaveBeenCalledWith("/activity/lessons/5/change-branch/", {
      branch: 2,
    });
  });

  it("DELETEs a lesson by id", async () => {
    await deleteLesson(5);
    expect(del).toHaveBeenCalledWith("/activity/lessons/5/");
  });
});

describe("time slots API", () => {
  it("GETs free slots for a specialist", async () => {
    await getTimeSlots({ specialist: 3, is_booked: false });
    expect(get).toHaveBeenCalledWith("/accounts/logoped_slot/", {
      params: { specialist: 3, is_booked: false },
    });
  });
});

describe("analytics API", () => {
  it("GETs dashboard analytics with date range", async () => {
    await getDashboardAnalytics({ date_from: "2026-05-01", date_to: "2026-05-31" });
    expect(get).toHaveBeenCalledWith("/web-admin/analytics/", {
      params: { date_from: "2026-05-01", date_to: "2026-05-31" },
    });
  });

  it("GETs payments analytics", async () => {
    await getPaymentsAnalytics({});
    expect(get).toHaveBeenCalledWith("/mobile/payments/analytics/", {
      params: {},
    });
  });
});
