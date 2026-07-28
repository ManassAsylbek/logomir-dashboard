import { AchievementCategory } from "@/shared/api/achievements/types";

export interface IconPreset {
  /** filename inside /public/achive/ */
  file: string;
  /** suggested template values when the user picks this preset */
  name: string;
  description?: string;
  category: AchievementCategory;
  points: number;
}

/**
 * 15 base icons available at /public/achive/.
 * When a logoped picks a preset, the form fields are pre-filled with
 * the recommended values below; they can still edit before submitting.
 */
export const ICON_PRESETS: IconPreset[] = [
  {
    file: "01_zvuk_r_tigr.png",
    name: "Победитель звука «Р»",
    description:
      "Получается за успешное прохождение всех упражнений на постановку и автоматизацию звука «Р».",
    category: "study",
    points: 20,
  },
  {
    file: "02_zvuk_l_lev.png",
    name: "Победитель звука «Л»",
    description: "Уверенно произносит звук «Л» во всех позициях.",
    category: "study",
    points: 20,
  },
  {
    file: "03_shipyashchie_zmeyka.png",
    name: "Шипящие подружились",
    description: "Чисто произносит шипящие звуки (ш, ж, щ, ч).",
    category: "study",
    points: 15,
  },
  {
    file: "04_svistyashchie_ptenets.png",
    name: "Свистящие подружились",
    description: "Чисто произносит свистящие звуки (с, з, ц).",
    category: "study",
    points: 15,
  },
  {
    file: "05_zvonkie_kolokolchik.png",
    name: "Звонкие звуки",
    description: "Различает и произносит звонкие согласные.",
    category: "study",
    points: 15,
  },
  {
    file: "06_drakon_shchit.png",
    name: "Победил дракона",
    description: "Справился с трудным звуком, который долго не получался.",
    category: "progress",
    points: 25,
  },
  {
    file: "07_strana_slogov_zamok.png",
    name: "Страна слогов",
    description: "Освоил слоговую структуру — читает и составляет слоги.",
    category: "study",
    points: 15,
  },
  {
    file: "08_volshebnik_proiznosheniya.png",
    name: "Волшебник произношения",
    description: "Чистая и выразительная речь на занятии.",
    category: "study",
    points: 20,
  },
  {
    file: "09_tri_dnya.png",
    name: "Три дня подряд",
    description: "Выполнял домашние задания три дня подряд.",
    category: "activity",
    points: 10,
  },
  {
    file: "10_nedelya_uspehov.png",
    name: "Неделя успехов",
    description: "Неделя без пропусков занятий и с выполненными заданиями.",
    category: "activity",
    points: 15,
  },
  {
    file: "11_kazhdyy_den.png",
    name: "Каждый день",
    description: "Занимался каждый день в течение всей недели.",
    category: "activity",
    points: 15,
  },
  {
    file: "12_zheleznaya_privychka.png",
    name: "Железная привычка",
    description: "Месяц регулярных занятий и упражнений дома.",
    category: "behavior",
    points: 25,
  },
  {
    file: "13_uverennyy_start_raketa.png",
    name: "Уверенный старт",
    description: "Отличное начало — освоил первые шаги программы.",
    category: "progress",
    points: 10,
  },
  {
    file: "14_vse_luchshe_stupenki.png",
    name: "Всё лучше и лучше",
    description: "Заметный прогресс по сравнению с прошлым месяцем.",
    category: "progress",
    points: 15,
  },
  {
    file: "15_novaya_vershina_gora.png",
    name: "Новая вершина",
    description: "Достиг важной вехи в развитии речи.",
    category: "progress",
    points: 30,
  },
];

export const iconPresetPath = (file: string) => `/achive/${file}`;

export const fetchPresetAsBlob = async (file: string): Promise<Blob> => {
  const response = await fetch(iconPresetPath(file));

  if (!response.ok) {
    throw new Error(`Не удалось загрузить иконку ${file}`);
  }

  return response.blob();
};
