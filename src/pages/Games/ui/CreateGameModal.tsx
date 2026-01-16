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
import { useCreateGame } from "@/shared/services/games/useCreateGame";
import { useEffect } from "react";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  image: File | null;
  answers: Answer[];
}

interface GameFormData {
  name: string;
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
    formState: { errors },
  } = useForm<GameFormData>({
    defaultValues: {
      name: "",
      theme: "",
      questions: [
        {
          question: "",
          image: null,
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

  const { mutate: createGame, isPending } = useCreateGame();

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const addQuestion = () => {
    append({
      question: "",
      image: null,
      answers: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    });
  };

  const onSubmit = (data: GameFormData) => {
    // Валидация вопросов
    const hasInvalidQuestions = data.questions.some(
      (q) =>
        !q.question.trim() ||
        q.answers.some((a) => !a.text.trim()) ||
        !q.answers.some((a) => a.isCorrect)
    );

    if (hasInvalidQuestions) {
      alert(
        "Заполните все вопросы, все варианты ответов и выберите правильный ответ для каждого вопроса"
      );
      return;
    }

    // Преобразуем данные в формат API
    const questionsData = data.questions.map((q) => {
      // Разбиваем текст вопроса на слова
      const words = q.question
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0)
        .map((word, index) => ({
          text: word,
          position: index,
        }));

      // Если слов меньше 2, добавляем заполнитель
      if (words.length < 2) {
        words.push({ text: "вопрос", position: words.length });
      }

      return {
        name: q.question,
        answers: q.answers.map((a) => ({
          name: a.text,
          is_correct: a.isCorrect,
        })),
        sentence: {
          text: q.question,
          words: words,
        },
      };
    });

    createGame(
      {
        name: data.name,
        game_type: "Quiz",
        theme: data.theme,
        questions: questionsData,
        allowed_users: [],
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
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
              <span className="text-2xl font-medium">Создание игры</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="bordered"
                  className="text-success border-success rounded-full px-4"
                >
                  Далее Ⓘ
                </Button>
                <Button
                  size="sm"
                  variant="bordered"
                  className="text-gray-600 border-gray-300 rounded-full px-4"
                >
                  ЗНГ Ⓘ
                </Button>
              </div>
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

                  {/* Image Upload */}
                  <Controller
                    name={`questions.${index}.image`}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center gap-3 mb-4 bg-white">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) onChange(file);
                          }}
                          className="hidden"
                          id={`file-${field.id}`}
                        />
                        <label
                          htmlFor={`file-${field.id}`}
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

                  {/* Question Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Вопрос
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

                  {/* Answer Options */}
                  <div>
                    <p className="text-sm font-medium mb-3">
                      Напишите ответы на вопросы, и выберите правильный
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {[0, 1, 2, 3].map((ansIndex) => (
                        <div key={ansIndex} className="flex items-center gap-2">
                          <Controller
                            name={`questions.${index}.answers.${ansIndex}.isCorrect`}
                            control={control}
                            render={({ field: { value } }) => (
                              <input
                                type="radio"
                                name={`question-${index}`}
                                checked={value}
                                onChange={() => {
                                  // Set all to false, then set current to true
                                  [0, 1, 2, 3].forEach((i) => {
                                    setValue(
                                      `questions.${index}.answers.${i}.isCorrect`,
                                      i === ansIndex
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
