import { GameType, Word } from "@/shared/api/games/types";

export interface FormAnswer {
  id?: string;
  text: string;
  isCorrect: boolean;
}

export interface FormQuestion {
  id?: string;
  sentenceId?: string;
  words?: Word[];
  question: string;
  answers: FormAnswer[];
}

export const buildWords = (
  text: string,
  originalWords: Word[] = [],
): Word[] => {
  const words: Word[] = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map((word, index) => {
      const originalId = originalWords[index]?.id;

      return {
        ...(originalId ? { id: originalId } : {}),
        text: word,
        position: index + 1,
      };
    });

  if (words.length < 2) {
    words.push({ text: "слово", position: words.length + 1 });
  }

  return words;
};

export const buildQuestionsData = (
  questions: FormQuestion[],
  gameType: GameType,
) => {
  return questions.map((q) => {
    if (gameType === GameType.Quiz) {
      return {
        ...(q.id ? { id: q.id } : {}),
        name: q.question,
        answers: q.answers.map((a) => ({
          ...(a.id ? { id: a.id } : {}),
          name: a.text,
          is_correct: a.isCorrect,
        })),
      };
    }

    return {
      ...(q.id ? { id: q.id } : {}),
      name: q.question,
      sentence: {
        ...(q.sentenceId ? { id: q.sentenceId } : {}),
        text: q.question,
        words: buildWords(q.question, q.words),
      },
    };
  });
};
