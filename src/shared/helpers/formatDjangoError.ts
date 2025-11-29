// utils/formatDjangoError.ts

const prettifyField = (field: string): string => {
  if (field === "non_field_errors") return "";

  return field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

export const formatDjangoError = (errorData: unknown): string => {
  if (!errorData || typeof errorData !== "object") {
    return "Неизвестная ошибка сервера";
  }

  const formatEntry = (key: string, value: any): string => {
    const field = prettifyField(key);

    if (Array.isArray(value)) {
      return field ? `${field}: ${value.join(", ")}` : value.join(", ");
    }

    if (typeof value === "string") {
      return field ? `${field}: ${value}` : value;
    }

    if (typeof value === "object" && value !== null) {
      return Object.entries(value)
        .map(([nestedKey, nestedValue]) =>
          formatEntry(`${key}.${nestedKey}`, nestedValue)
        )
        .join("\n");
    }

    return field ? `${field}: Ошибка` : "Ошибка";
  };

  const entries = Object.entries(errorData as Record<string, any>);

  return entries.map(([key, value]) => formatEntry(key, value)).join("\n");
};
