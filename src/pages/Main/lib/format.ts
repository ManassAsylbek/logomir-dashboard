export const MONTHS_RU = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];

export const formatRu = (n: number) => Math.round(n).toLocaleString("ru-RU");

export const monthLabel = (month: string) => {
  const idx = Number(month.split("-")[1]) - 1;

  return MONTHS_RU[idx] ?? month;
};

export const weekdayLabel = (day: string) => {
  const label = new Date(`${day}T00:00:00`).toLocaleDateString("ru-RU", {
    weekday: "short",
  });

  return label.charAt(0).toUpperCase() + label.slice(1);
};

export const formatTime = (iso: string | null) => {
  if (!iso) return "";

  return new Date(iso).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const isPositiveDelta = (delta: number) => delta >= 0;

export const deltaText = (delta: number, percent?: boolean) =>
  `${isPositiveDelta(delta) ? "+" : ""}${delta}${percent ? "%" : ""}`;
