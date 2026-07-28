export const unwrapList = <T>(
  data: T[] | { results?: T[] } | null | undefined,
): T[] => (Array.isArray(data) ? data : (data?.results ?? []));
