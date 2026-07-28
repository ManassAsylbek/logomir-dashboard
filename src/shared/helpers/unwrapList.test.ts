import { describe, it, expect } from "vitest";

import { unwrapList } from "./unwrapList";

describe("unwrapList", () => {
  it("returns a plain array unchanged", () => {
    expect(unwrapList([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("extracts results from a DRF paginated response", () => {
    expect(unwrapList({ results: ["a", "b"] })).toEqual(["a", "b"]);
  });

  it("returns [] for null or undefined", () => {
    expect(unwrapList(null)).toEqual([]);
    expect(unwrapList(undefined)).toEqual([]);
  });

  it("returns [] when results are missing", () => {
    expect(unwrapList({})).toEqual([]);
  });
});
