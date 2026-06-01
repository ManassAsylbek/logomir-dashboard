import { AchievementCategory } from "@/shared/api/achievements/types";

export interface IconPreset {
  /** filename inside /public/achievement-icons/ */
  file: string;
  /** suggested template values when the user picks this preset */
  name: string;
  description?: string;
  category: AchievementCategory;
  points: number;
}

/**
 * 15 base icons that the logoped can pick from when creating an achievement.
 * Drop the matching PNGs into /public/achievement-icons/ as 01.png … 15.png.
 * When a logoped selects a preset, the form is auto-filled with these
 * suggestions — they can still edit before submitting.
 */
export const ICON_PRESETS: IconPreset[] = [
  {
    file: "01.png",
    name: "Победитель звука «Р»",
    description:
      "Получается за успешное прохождение всех упражнений на постановку и автоматизацию звука «Р».",
    category: "study",
    points: 20,
  },
  {
    file: "02.png",
    name: "Звук «Р» закреплён",
    description: "Стабильно произносит звук «Р» в речи.",
    category: "study",
    points: 15,
  },
  {
    file: "03.png",
    name: "Звук «Л» закреплён",
    description: "Уверенно произносит звук «Л» в речи.",
    category: "study",
    points: 15,
  },
  {
    file: "04.png",
    name: "Шипящие подружились",
    description: "Чисто произносит шипящие звуки (ш, ж, щ, ч).",
    category: "study",
    points: 15,
  },
  {
    file: "05.png",
    name: "Свистящие подружились",
    description: "Чисто произносит свистящие звуки (с, з, ц).",
    category: "study",
    points: 15,
  },
  {
    file: "06.png",
    name: "Первое слово",
    description: "Произнёс своё первое слово на занятии.",
    category: "progress",
    points: 10,
  },
  {
    file: "07.png",
    name: "Первое предложение",
    description: "Составил и произнёс полное предложение.",
    category: "progress",
    points: 15,
  },
  {
    file: "08.png",
    name: "Внимательный слушатель",
    description: "Не отвлекался всё занятие.",
    category: "behavior",
    points: 5,
  },
  {
    file: "09.png",
    name: "Старательный ученик",
    description: "Особенно старался на этом занятии.",
    category: "behavior",
    points: 5,
  },
  {
    file: "10.png",
    name: "Лучший друг",
    description: "Помогал другим ребятам на групповом занятии.",
    category: "behavior",
    points: 10,
  },
  {
    file: "11.png",
    name: "Активный участник",
    description: "Активно отвечал на вопросы и участвовал в играх.",
    category: "activity",
    points: 10,
  },
  {
    file: "12.png",
    name: "Без пропусков",
    description: "Месяц без пропусков занятий.",
    category: "activity",
    points: 20,
  },
  {
    file: "13.png",
    name: "Домашнее задание",
    description: "Выполнил все домашние задания за неделю.",
    category: "activity",
    points: 10,
  },
  {
    file: "14.png",
    name: "Маленькая победа",
    description: "Преодолел сложность, с которой раньше не получалось.",
    category: "progress",
    points: 15,
  },
  {
    file: "15.png",
    name: "Новая вершина",
    description: "Достиг важной вехи в развитии речи.",
    category: "progress",
    points: 25,
  },
];

export const iconPresetPath = (file: string) => `/achievement-icons/${file}`;

export const fetchPresetAsBlob = async (file: string): Promise<Blob> => {
  const response = await fetch(iconPresetPath(file));

  if (!response.ok) {
    throw new Error(`Не удалось загрузить иконку ${file}`);
  }

  return response.blob();
};
