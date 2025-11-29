export const getKey = (key: string, type: "MUTATION" | "QUERY") =>
  `LIST_${key}__${type}`;
