import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Upload, Plus, X } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useCreateGame } from "@/shared/services/games/useCreateGame";
import { useEffect } from "react";
import { GameType, GAME_TYPE_LABELS } from "@/shared/api/games/types";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Word {
  text: string;
  position: number;
}

interface Question {
  question: string;
  image: File | null;
  audio: File | null;
  sentenceText: string;
  words: Word[];
  answers: Answer[];
}

interface GameFormData {
  name: string;
  gameType: GameType;
  theme: string;
  questions: Question[];
}

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateGameModal({ isOpen, onClose }: CreateGameModalProps) {
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
          sentenceText: "",
          words: [{ text: "", position: 1 }],
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

  const { mutate: createGame, isPending } = useCreateGame();

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  // When game type changes — reset all questions to blank
  const handleGameTypeChange = (newType: GameType) => {
    setValue("gameType", newType);
    setValue("questions", [
      {
        question: "",
        image: null,
        audio: null,
        sentenceText: "",
        words: [{ text: "", position: 1 }],
        answers: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const addQuestion = () => {
    append({
      question: "",
      image: null,
      audio: null,
      sentenceText: "",
      words: [{ text: "", position: 1 }],
      answers: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ] as { text: string; isCorrect: boolean }[],
    });
  };

  const onSubmit = (data: GameFormData) => {
    const questionsData = data.questions.map((q) => {
      if (data.gameType === GameType.Quiz) {
        return {
          name: q.question,
          answers: q.answers.map((a) => ({
            name: a.text,
            is_correct: a.isCorrect,
          })),
        };
      }

      return {
        name: q.question,
        sentence: {
          text: q.sentenceText,
          words: q.words.map((w) => ({
            text: w.text,
            position: w.position,
          })),
        },
      };
    });

    const gameJson = {
      name: data.name,
      game_type: data.gameType,
      theme: data.theme,
      questions: questionsData,
      allowed_users: [],
    };

    // Check if any question has a file attached
    const hasFiles = data.questions.some((q) => q.image || q.audio);

    if (!hasFiles) {
      // Send as plain JSON
      createGame(gameJson, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
      return;
    }

    // Send as multipart/form-data — поле data (JSON строка) + файлы
    const formData = new FormData();
    formData.append("data", JSON.stringify(gameJson));

    data.questions.forEach((question, index) => {
      if (data.gameType === GameType.Quiz && question.image) {
        formData.append(`question_${index}_image`, question.image);
      }
      if (data.gameType === GameType.AudioSentenceOrdering && question.audio) {
        formData.append(`question_${index}_sentence_audio`, question.audio);
      }
    });

    createGame(formData, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
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
              <span className="text-2xl font-medium">Создание игры</span>
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

              {/* Game Type */}
              <div className="mb-6">
                <label className="block text-base font-medium mb-2">
                  Тип игры
                </label>
                <Controller
                  name="gameType"
                  control={control}
                  render={({ field }) => (
                    <select
                      value={field.value}
                      onChange={(e) =>
                        handleGameTypeChange(e.target.value as GameType)
                      }
                      className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
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

                  {selectedGameType === GameType.Quiz ? (
                    <Controller
                      name={`questions.${index}.image`}
                      control={control}
                      render={({ field: { onChange, value } }) => {
                        const hasError = !!errors.questions?.[index]?.image;
                        return (
                          <div className="mb-4">
                            <div
                              className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-3 bg-white transition-colors ${
                                hasError
                                  ? "border-danger-400 bg-danger-50"
                                  : value
                                    ? "border-success-400 bg-success-50"
                                    : "border-gray-300"
                              }`}
                            >
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
                                <div
                                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                                    hasError ? "bg-danger" : "bg-success"
                                  }`}
                                >
                                  <Upload className="w-6 h-6 text-white" />
                                </div>
                                {value ? (
                                  <p className="text-sm font-medium text-success-600">
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
                            {hasError && (
                              <p className="text-danger text-xs mt-1 flex items-center gap-1">
                                <span>⚠</span> Загрузите изображение для
                                вопроса
                              </p>
                            )}
                          </div>
                        );
                      }}
                    />
                  ) : (
                    <Controller
                      name={`questions.${index}.audio`}
                      control={control}
                      rules={{
                        validate: (v) =>
                          !!v || "Загрузите аудио файл для вопроса",
                      }}
                      render={({ field: { onChange, value } }) => {
                        const hasError = !!errors.questions?.[index]?.audio;
                        return (
                          <div className="mb-4">
                            <div
                              className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-3 bg-white transition-colors ${
                                hasError
                                  ? "border-danger-400 bg-danger-50"
                                  : value
                                    ? "border-success-400 bg-success-50"
                                    : "border-gray-300"
                              }`}
                            >
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
                                <div
                                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                                    hasError ? "bg-danger" : "bg-success"
                                  }`}
                                >
                                  <Upload className="w-6 h-6 text-white" />
                                </div>
                                {value ? (
                                  <p className="text-sm font-medium text-success-600">
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
                            {hasError && (
                              <p className="text-danger text-xs mt-1 flex items-center gap-1">
                                <span>⚠</span> Загрузите аудио файл для вопроса
                              </p>
                            )}
                          </div>
                        );
                      }}
                    />
                  )}

                  {/* Question Input — only for Quiz */}
                  {selectedGameType === GameType.Quiz && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Вопрос
                      </label>
                      <Controller
                        name={`questions.${index}.question`}
                        control={control}
                        rules={{ required: "Вопрос обязателен" }}
                        render={({ field: fieldProps }) => (
                          <Input
                            {...fieldProps}
                            placeholder="Введите вопрос"
                            size="lg"
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
                  )}

                  {selectedGameType === GameType.AudioSentenceOrdering && (
                    <>
                      {/* Sentence text */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                          Полный текст фразы
                        </label>
                        <Controller
                          name={`questions.${index}.sentenceText`}
                          control={control}
                          rules={{ required: "Фраза обязательна" }}
                          render={({ field: sf }) => {
                            const wordCount = sf.value
                              .trim()
                              .split(/\s+/)
                              .filter(Boolean).length;
                            const atLimit =
                              wordCount >= 6 && sf.value.endsWith(" ");
                            const hasError =
                              !!errors.questions?.[index]?.sentenceText;
                            return (
                              <div>
                                <Input
                                  {...sf}
                                  placeholder="Hello world"
                                  size="lg"
                                  isInvalid={hasError}
                                  errorMessage={
                                    hasError
                                      ? errors.questions?.[index]?.sentenceText
                                          ?.message
                                      : undefined
                                  }
                                  classNames={{
                                    inputWrapper:
                                      "bg-white border border-gray-300",
                                  }}
                                  onChange={(e) => {
                                    const raw = e.target.value;
                                    // Ограничиваем ввод 6 словами
                                    const words = raw
                                      .split(/\s+/)
                                      .filter(Boolean);
                                    const limited =
                                      words.length > 6
                                        ? words.slice(0, 6).join(" ")
                                        : raw;
                                    sf.onChange(limited);
                                    setValue(
                                      `questions.${index}.question`,
                                      limited,
                                    );
                                    const parsed = limited
                                      .trim()
                                      .split(/\s+/)
                                      .filter(Boolean)
                                      .slice(0, 6)
                                      .map((t, i) => ({
                                        text: t,
                                        position: i + 1,
                                      }));
                                    const shuffled = [...parsed].sort(
                                      () => Math.random() - 0.5,
                                    );
                                    setValue(
                                      `questions.${index}.words`,
                                      parsed.length > 0
                                        ? shuffled
                                        : [{ text: "", position: 1 }],
                                    );
                                  }}
                                />
                                <p
                                  className={`text-xs mt-1 ${atLimit ? "text-danger-500" : "text-gray-400"}`}
                                >
                                  {wordCount}/6 слов
                                  {atLimit && " — достигнут максимум"}
                                </p>
                              </div>
                            );
                          }}
                        />
                      </div>

                      {/* Words — read only preview */}
                      {(watch(`questions.${index}.words`) ?? []).some(
                        (w) => w.text,
                      ) && (
                        <div className="mb-2">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-medium">
                              Слова и порядок
                            </p>
                            <Button
                              size="sm"
                              variant="bordered"
                              type="button"
                              className="rounded-full text-gray-600 border-gray-300 text-xs px-3"
                              onPress={() => {
                                const cur = watch(`questions.${index}.words`);
                                const reshuffled = [...cur].sort(
                                  () => Math.random() - 0.5,
                                );
                                setValue(
                                  `questions.${index}.words`,
                                  reshuffled,
                                );
                              }}
                            >
                              🔀 Перемешать
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(watch(`questions.${index}.words`) ?? []).map(
                              (w, wIdx) => (
                                <div
                                  key={wIdx}
                                  className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-xl px-4 py-2 shadow-sm"
                                >
                                  <span className="text-xs text-gray-400 font-medium">
                                    {w.position}.
                                  </span>
                                  <span className="text-base font-semibold text-gray-800">
                                    {w.text}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {selectedGameType === GameType.Quiz && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium">
                          Напишите ответы и выберите правильный
                        </p>
                        {(watch(`questions.${index}.answers`) ?? []).every(
                          (a) => !a.isCorrect,
                        ) &&
                          errors.questions?.[index] && (
                            <p className="text-danger text-xs flex items-center gap-1">
                              <span>⚠</span> Выберите правильный ответ
                            </p>
                          )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[0, 1, 2, 3].map((ansIndex) => {
                          const isCorrect = watch(
                            `questions.${index}.answers.${ansIndex}.isCorrect`,
                          );
                          const hasAnswerError =
                            !!errors.questions?.[index]?.answers?.[ansIndex]
                              ?.text;
                          return (
                            <div
                              key={ansIndex}
                              className={`flex items-center gap-2 rounded-xl px-3 py-1 border transition-colors ${
                                isCorrect
                                  ? "border-success-400 bg-success-50"
                                  : hasAnswerError
                                    ? "border-danger-300 bg-danger-50"
                                    : "border-transparent bg-transparent"
                              }`}
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
                                    className="w-4 h-4 cursor-pointer accent-green-500"
                                  />
                                )}
                              />
                              <Controller
                                name={`questions.${index}.answers.${ansIndex}.text`}
                                control={control}
                                rules={{ required: true }}
                                render={({ field: fieldProps }) => (
                                  <Input
                                    {...fieldProps}
                                    placeholder={`${ansIndex + 1} вариант`}
                                    size="sm"
                                    isInvalid={hasAnswerError}
                                    errorMessage={
                                      hasAnswerError
                                        ? "Заполните вариант"
                                        : undefined
                                    }
                                    classNames={{
                                      inputWrapper:
                                        "bg-white border border-gray-300",
                                    }}
                                  />
                                )}
                              />
                            </div>
                          );
                        })}
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
                  Сохранить игру
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
