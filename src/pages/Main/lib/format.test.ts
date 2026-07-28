import { describe, it, expect } from "vitest";

import {
  monthLabel,
  deltaText,
  isPositiveDelta,
  formatRu,
  formatTime,
} from "./format";

describe("monthLabel", () => {
  it("maps YYYY-MM to a Russian month abbreviation", () => {
    expect(monthLabel("2026-01")).toBe("Янв");
    expect(monthLabel("2026-12")).toBe("Дек");
  });

  it("falls back to the raw value for an unknown month", () => {
    expect(monthLabel("2026-99")).toBe("2026-99");
  });
});

describe("deltaText / isPositiveDelta", () => {
  it("formats positive, negative and zero deltas", () => {
    expect(deltaText(4, true)).toBe("+4%");
    expect(deltaText(-1)).toBe("-1");
    expect(deltaText(0, true)).toBe("+0%");
  });

  it("treats zero and above as positive", () => {
    expect(isPositiveDelta(0)).toBe(true);
    expect(isPositiveDelta(2)).toBe(true);
    expect(isPositiveDelta(-1)).toBe(false);
  });
});

describe("formatRu", () => {
  it("preserves all digits when grouping thousands", () => {
    expect(formatRu(1083266).replace(/\D/g, "")).toBe("1083266");
  });

  it("rounds fractional values", () => {
    expect(formatRu(4314.6).replace(/\D/g, "")).toBe("4315");
  });
});

describe("formatTime", () => {
  it("returns an empty string for null", () => {
    expect(formatTime(null)).toBe("");
  });

  it("returns a non-empty time string for an ISO value", () => {
    expect(formatTime("2026-05-29T10:00:00Z").length).toBeGreaterThan(0);
  });
});
