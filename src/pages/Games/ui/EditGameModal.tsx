import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Upload, Plus, X } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useUpdateGame } from "@/shared/services/games/useUpdateGame";
import { useEffect } from "react";
import {
  Game,
  GameType,
  GAME_TYPE_LABELS,
  Word,
} from "@/shared/api/games/types";

interface Answer {
  id?: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id?: string;
  sentenceId?: string;
  words?: Word[];
  question: string;
  image: File | null;
  audio: File | null;
  answers: Answer[];
}

interface GameFormData {
  name: string;
  gameType: GameType;
  theme: string;
  questions: Question[];
}

interface EditGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game | null;
}

export function EditGameModal({ isOpen, onClose, game }: EditGameModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GameFormData>({
    defaultValues: {
      name: "",
      gameType: GameType.Quiz,
      theme: "",
      questions: [
        {
          question: "",
          image: null,
          audio: null,
          answers: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const selectedGameType = watch("gameType");

  const { mutate: updateGame, isPending } = useUpdateGame();

  // Load game data when modal opens
  useEffect(() => {
    if (isOpen && game) {
      reset({
        name: game.name,
        gameType: game.game_type,
        theme: game.theme,
        questions: game.questions.map((q) => ({
          id: q.id,
          sentenceId: q.sentence?.id,
          words: q.sentence?.words ?? [],
          question: q.name,
          image: null,
          audio: null,
          answers: (q.answers ?? []).map((a) => ({
            id: a.id,
            text: a.name,
            isCorrect: a.is_correct,
          })),
        })),
      });
    }
  }, [isOpen, game, reset]);

  const addQuestion = () => {
    append({
      question: "",
      image: null,
      audio: null,
      answers: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    });
  };

  const onSubmit = (data: GameFormData) => {
    if (!game) return;

    const hasEmptyQuestion = data.questions.some((q) => !q.question.trim());

    if (hasEmptyQuestion) {
      alert("Заполните текст для каждого вопроса");
      return;
    }

    if (data.gameType === GameType.Quiz) {
      const hasInvalidAnswers = data.questions.some(
        (q) =>
          q.answers.some((a) => !a.text.trim()) ||
          !q.answers.some((a) => a.isCorrect),
      );

      if (hasInvalidAnswers) {
        alert(
          "Заполните все варианты ответов и выберите правильный ответ для каждого вопроса",
        );
        return;
      }
    }

    if (data.gameType === GameType.AudioSentenceOrdering) {
      const hasMissingAudio = data.questions.some((q) => !q.audio);

      if (hasMissingAudio) {
        alert("Добавьте аудио файл для каждого вопроса");
        return;
      }
    }

    const buildWords = (text: string, originalWords: Word[] = []): Word[] => {
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

    const questionsData = data.questions.map((q) => {
      if (data.gameType === GameType.Quiz) {
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

    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        name: data.name,
        game_type: data.gameType,
        theme: data.theme,
        questions: questionsData,
        allowed_users: game.allowed_users,
      }),
    );

    data.questions.forEach((question, index) => {
      if (data.gameType === GameType.Quiz && question.image) {
        formData.append(`question_${index}_image`, question.image);
      }

      if (data.gameType === GameType.AudioSentenceOrdering && question.audio) {
        formData.append(`question_${index}_sentence_audio`, question.audio);
      }
    });

    updateGame(
      { id: game.id, formData },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      scrollBehavior="inside"
      classNames={{
        base: "max-h-[90vh]",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center justify-between px-8 py-6 border-b">
              <span className="text-2xl font-medium">Редактирование игры</span>
            </ModalHeader>

            <ModalBody className="px-8 py-6">
              {/* Game Title */}
              <div className="mb-6">
                <label className="block text-base font-medium mb-2">
                  Название игры
                </label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Название обязательно" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Игра 1"
                      size="lg"
                      isInvalid={!!errors.name}
                      errorMessage={errors.name?.message}
                      classNames={{
                        inputWrapper: "bg-white border border-gray-300",
                      }}
                    />
                  )}
                />
              </div>

              {/* Theme */}
              <div className="mb-6">
                <label className="block text-base font-medium mb-2">Тема</label>
                <Controller
                  name="theme"
                  control={control}
                  rules={{ required: "Тема обязательна" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Введите тему"
                      size="lg"
                      isInvalid={!!errors.theme}
                      errorMessage={errors.theme?.message}
                      classNames={{
                        inputWrapper: "bg-white border border-gray-300",
                      }}
                    />
                  )}
                />
              </div>

              {/* Questions */}
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="mb-8 p-6 bg-[#f0fdf4] rounded-lg relative"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Вопрос №{index + 1}</h3>
                    {fields.length > 1 && (
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        type="button"
                        onPress={() => remove(index)}
                      >
                        <X size={18} />
                      </Button>
                    )}
                  </div>

                  {index === 0 && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Тип игры
                      </label>
                      <Controller
                        name="gameType"
                        control={control}
                        rules={{ required: "Тип игры обязателен" }}
                        render={({ field: gameTypeField }) => (
                          <select
                            {...gameTypeField}
                            className="w-full h-10 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                          >
                            <option value={GameType.Quiz}>
                              {GAME_TYPE_LABELS[GameType.Quiz]}
                            </option>
                            <option value={GameType.AudioSentenceOrdering}>
                              {GAME_TYPE_LABELS[GameType.AudioSentenceOrdering]}
                            </option>
                          </select>
                        )}
                      />
                    </div>
                  )}

                  {selectedGameType === GameType.Quiz ? (
                    <Controller
                      name={`questions.${index}.image`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center gap-3 mb-4 bg-white">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0] ?? null;
                              onChange(file);
                            }}
                            className="hidden"
                            id={`image-file-${field.id}`}
                          />
                          <label
                            htmlFor={`image-file-${field.id}`}
                            className="cursor-pointer flex flex-col items-center"
                          >
                            <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center mb-2">
                              <Upload className="w-6 h-6 text-white" />
                            </div>
                            {value ? (
                              <p className="text-sm font-medium text-success">
                                {(value as File).name}
                              </p>
                            ) : (
                              <>
                                <p className="text-sm font-medium">
                                  Загрузите картинку
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Файл должен весить не более 100 МБ
                                </p>
                              </>
                            )}
                          </label>
                        </div>
                      )}
                    />
                  ) : (
                    <Controller
                      name={`questions.${index}.audio`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center gap-3 mb-4 bg-white">
                          <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0] ?? null;
                              onChange(file);
                            }}
                            className="hidden"
                            id={`audio-file-${field.id}`}
                          />
                          <label
                            htmlFor={`audio-file-${field.id}`}
                            className="cursor-pointer flex flex-col items-center"
                          >
                            <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center mb-2">
                              <Upload className="w-6 h-6 text-white" />
                            </div>
                            {value ? (
                              <p className="text-sm font-medium text-success">
                                {(value as File).name}
                              </p>
                            ) : (
                              <>
                                <p className="text-sm font-medium">
                                  Загрузите аудио
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Поддерживаются mp3, wav, ogg
                                </p>
                              </>
                            )}
                          </label>
                        </div>
                      )}
                    />
                  )}

                  {/* Question Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      {selectedGameType === GameType.Quiz ? "Вопрос" : "Фраза"}
                    </label>
                    <Controller
                      name={`questions.${index}.question`}
                      control={control}
                      rules={{ required: "Вопрос обязателен" }}
                      render={({ field: fieldProps }) => (
                        <Textarea
                          {...fieldProps}
                          placeholder="Введите вопрос"
                          minRows={3}
                          isInvalid={!!errors.questions?.[index]?.question}
                          errorMessage={
                            errors.questions?.[index]?.question?.message
                          }
                          classNames={{
                            inputWrapper: "bg-white border border-gray-300",
                          }}
                        />
                      )}
                    />
                  </div>

                  {selectedGameType === GameType.Quiz && (
                    <div>
                      <p className="text-sm font-medium mb-3">
                        Напишите ответы на вопросы, и выберите правильный
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {[0, 1, 2, 3].map((ansIndex) => (
                          <div
                            key={ansIndex}
                            className="flex items-center gap-2"
                          >
                            <Controller
                              name={`questions.${index}.answers.${ansIndex}.isCorrect`}
                              control={control}
                              render={({ field: { value } }) => (
                                <input
                                  type="radio"
                                  name={`question-${index}`}
                                  checked={value}
                                  onChange={() => {
                                    [0, 1, 2, 3].forEach((i) => {
                                      setValue(
                                        `questions.${index}.answers.${i}.isCorrect`,
                                        i === ansIndex,
                                      );
                                    });
                                  }}
                                  className="w-4 h-4 cursor-pointer"
                                />
                              )}
                            />
                            <Controller
                              name={`questions.${index}.answers.${ansIndex}.text`}
                              control={control}
                              rules={{ required: "Ответ обязателен" }}
                              render={({ field: fieldProps }) => (
                                <Input
                                  {...fieldProps}
                                  placeholder={`${ansIndex + 1} вариант`}
                                  size="sm"
                                  isInvalid={
                                    !!errors.questions?.[index]?.answers?.[
                                      ansIndex
                                    ]?.text
                                  }
                                  classNames={{
                                    inputWrapper:
                                      "bg-white border border-gray-300",
                                  }}
                                />
                              )}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </ModalBody>

            <ModalFooter className="px-8 pb-6 border-t flex justify-between">
              <Button
                variant="light"
                type="button"
                className="text-gray-600 border border-gray-300 px-6 rounded-full"
                startContent={<Plus size={18} />}
                onPress={addQuestion}
              >
                Добавить вопрос
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="light"
                  type="button"
                  className="text-gray-600 px-6 rounded-full"
                  onPress={onClose}
                >
                  Отмена
                </Button>
                <Button
                  type="button"
                  className="bg-[#2d2d2d] text-white px-8 rounded-full"
                  isLoading={isPending}
                  onPress={() => handleSubmit(onSubmit)()}
                >
                  Сохранить изменения
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
