import { describe, it, expect } from "vitest";

import { GameType } from "@/shared/api/games/types";

import { buildWords, buildQuestionsData, FormQuestion } from "./buildGamePayload";

describe("buildWords", () => {
  it("tokenizes text into 1-based positions", () => {
    expect(buildWords("Мама мыла раму")).toEqual([
      { text: "Мама", position: 1 },
      { text: "мыла", position: 2 },
      { text: "раму", position: 3 },
    ]);
  });

  it("reuses original word ids positionally, new tokens get none", () => {
    const original = [
      { id: "w1", text: "Мама", position: 1 },
      { id: "w2", text: "мыла", position: 2 },
    ];

    expect(buildWords("Мама мыла раму", original)).toEqual([
      { id: "w1", text: "Мама", position: 1 },
      { id: "w2", text: "мыла", position: 2 },
      { text: "раму", position: 3 },
    ]);
  });

  it("appends a filler word when fewer than two tokens", () => {
    expect(buildWords("Привет")).toEqual([
      { text: "Привет", position: 1 },
      { text: "слово", position: 2 },
    ]);
  });
});

describe("buildQuestionsData — Quiz", () => {
  it("keeps ids for existing question/answers and omits them for new ones", () => {
    const questions: FormQuestion[] = [
      {
        id: "q1",
        question: "Q1",
        answers: [
          { id: "a1", text: "A", isCorrect: true },
          { text: "B", isCorrect: false },
        ],
      },
      { question: "Q2", answers: [{ text: "C", isCorrect: true }] },
    ];

    expect(buildQuestionsData(questions, GameType.Quiz)).toEqual([
      {
        id: "q1",
        name: "Q1",
        answers: [
          { id: "a1", name: "A", is_correct: true },
          { name: "B", is_correct: false },
        ],
      },
      { name: "Q2", answers: [{ name: "C", is_correct: true }] },
    ]);
  });
});

describe("buildQuestionsData — Audio_sentence_ordering", () => {
  it("builds a sentence with id and reuses word ids", () => {
    const questions: FormQuestion[] = [
      {
        id: "q1",
        sentenceId: "s1",
        words: [{ id: "w1", text: "Мама", position: 1 }],
        question: "Мама мыла",
        answers: [],
      },
    ];

    expect(
      buildQuestionsData(questions, GameType.AudioSentenceOrdering),
    ).toEqual([
      {
        id: "q1",
        name: "Мама мыла",
        sentence: {
          id: "s1",
          text: "Мама мыла",
          words: [
            { id: "w1", text: "Мама", position: 1 },
            { text: "мыла", position: 2 },
          ],
        },
      },
    ]);
  });

  it("omits ids for a brand-new question", () => {
    const questions: FormQuestion[] = [{ question: "Кот спит", answers: [] }];

    expect(
      buildQuestionsData(questions, GameType.AudioSentenceOrdering),
    ).toEqual([
      {
        name: "Кот спит",
        sentence: {
          text: "Кот спит",
          words: [
            { text: "Кот", position: 1 },
            { text: "спит", position: 2 },
          ],
        },
      },
    ]);
  });
});
