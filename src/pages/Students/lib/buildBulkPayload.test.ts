import { describe, it, expect } from "vitest";

import { buildBulkLessonsPayload } from "./buildBulkPayload";

describe("buildBulkLessonsPayload", () => {
  it("online: omits branch and user_tariff when not provided", () => {
    expect(
      buildBulkLessonsPayload({
        user: 7,
        lessonType: "online",
        branch: null,
        deductTariff: null,
        timeSlots: [1, 2],
        name: "Курс",
      }),
    ).toEqual({
      user: 7,
      lesson_type: "online",
      time_slots: [1, 2],
      name: "Курс",
    });
  });

  it("offline: includes the selected branch", () => {
    expect(
      buildBulkLessonsPayload({
        user: 7,
        lessonType: "offline",
        branch: 3,
        deductTariff: null,
        timeSlots: [1],
        name: "x",
      }),
    ).toEqual({
      user: 7,
      lesson_type: "offline",
      branch: 3,
      time_slots: [1],
      name: "x",
    });
  });

  it("includes user_tariff when a balance is selected to deduct from", () => {
    const result = buildBulkLessonsPayload({
      user: 7,
      lessonType: "online",
      branch: null,
      deductTariff: 5,
      timeSlots: [1],
      name: "x",
    });

    expect(result.user_tariff).toBe(5);
  });

  it("falls back to 'Курс' when the name is blank", () => {
    const result = buildBulkLessonsPayload({
      user: 7,
      lessonType: "online",
      branch: null,
      deductTariff: null,
      timeSlots: [1],
      name: "   ",
    });

    expect(result.name).toBe("Курс");
  });
});
