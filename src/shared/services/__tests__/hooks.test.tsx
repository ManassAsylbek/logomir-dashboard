import { describe, it, expect, beforeEach, vi } from "vitest";
import type { ReactNode } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@/shared/api/tariffs/getTariffs", () => ({ getTariffs: vi.fn() }));
vi.mock("@/shared/api/userTariffs/getUserTariffs", () => ({
  getUserTariffs: vi.fn(),
}));

import { getTariffs } from "@/shared/api/tariffs/getTariffs";
import { getUserTariffs } from "@/shared/api/userTariffs/getUserTariffs";
import { useTariffs } from "@/shared/services/tariffs/useTariffs";
import { useUserTariffs } from "@/shared/services/userTariffs/useUserTariffs";

const createWrapper = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useTariffs", () => {
  it("unwraps a paginated tariffs response into an array", async () => {
    vi.mocked(getTariffs).mockResolvedValue({
      data: { count: 1, next: null, previous: null, results: [{ id: 1 }] },
    } as any);

    const { result } = renderHook(() => useTariffs(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([{ id: 1 }]);
  });
});

describe("useUserTariffs", () => {
  it("does not fetch when no user id is provided", () => {
    const { result } = renderHook(() => useUserTariffs(undefined), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe("idle");
    expect(getUserTariffs).not.toHaveBeenCalled();
  });

  it("fetches and unwraps a bare-array response for a given user", async () => {
    vi.mocked(getUserTariffs).mockResolvedValue({
      data: [{ id: 5, lessons_left: 20 }],
    } as any);

    const { result } = renderHook(() => useUserTariffs(7), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(getUserTariffs).toHaveBeenCalledWith(7);
    expect(result.current.data).toEqual([{ id: 5, lessons_left: 20 }]);
  });
});
