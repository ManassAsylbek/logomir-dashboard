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
import { Checkbox } from "@heroui/checkbox";
import { useState } from "react";
import { useCreateGame } from "@/shared/services/games/useCreateGame";

interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  question: string;
  image: File | null;
  answers: Answer[];
}

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateGameModal({ isOpen, onClose }: CreateGameModalProps) {
  const [gameName, setGameName] = useState("");
  const [theme, setTheme] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "",
      image: null,
      answers: [
        { id: "1", text: "", isCorrect: false },
        { id: "2", text: "", isCorrect: false },
        { id: "3", text: "", isCorrect: false },
        { id: "4", text: "", isCorrect: false },
      ],
    },
  ]);

  const { mutate: createGame, isPending } = useCreateGame();

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      image: null,
      answers: [
        { id: "1", text: "", isCorrect: false },
        { id: "2", text: "", isCorrect: false },
        { id: "3", text: "", isCorrect: false },
        { id: "4", text: "", isCorrect: false },
      ],
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (questionId: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== questionId));
    }
  };

  const updateQuestion = (questionId: string, text: string) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, question: text } : q))
    );
  };

  const updateAnswer = (questionId: string, answerId: string, text: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.map((a) =>
                a.id === answerId ? { ...a, text } : a
              ),
            }
          : q
      )
    );
  };

  const toggleCorrectAnswer = (questionId: string, answerId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.map((a) => ({
                ...a,
                isCorrect: a.id === answerId,
              })),
            }
          : q
      )
    );
  };

  const handleImageUpload = (questionId: string, file: File) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, image: file } : q))
    );
  };

  const handleSubmit = () => {
    if (!gameName || !theme) {
      alert("Заполните название игры и тему");
      return;
    }

    createGame(
      {
        name: gameName,
        game_type: "Quiz",
        theme: theme,
      },
      {
        onSuccess: () => {
          setGameName("");
          setTheme("");
          setQuestions([
            {
              id: "1",
              question: "",
              image: null,
              answers: [
                { id: "1", text: "", isCorrect: false },
                { id: "2", text: "", isCorrect: false },
                { id: "3", text: "", isCorrect: false },
                { id: "4", text: "", isCorrect: false },
              ],
            },
          ]);
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
                <Input
                  placeholder="Игра 1"
                  value={gameName}
                  onChange={(e) => setGameName(e.target.value)}
                  size="lg"
                  classNames={{
                    inputWrapper: "bg-white border border-gray-300",
                  }}
                />
              </div>

              {/* Questions */}
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="mb-8 p-6 bg-[#f0fdf4] rounded-lg relative"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Вопрос №{index + 1}</h3>
                    {questions.length > 1 && (
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => removeQuestion(question.id)}
                      >
                        <X size={18} />
                      </Button>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center gap-3 mb-4 bg-white">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(question.id, file);
                      }}
                      className="hidden"
                      id={`file-${question.id}`}
                    />
                    <label
                      htmlFor={`file-${question.id}`}
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center mb-2">
                        <Upload className="w-6 h-6 text-white" />
                      </div>
                      {question.image ? (
                        <p className="text-sm font-medium text-success">
                          {question.image.name}
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

                  {/* Question Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Вопрос
                    </label>
                    <Input
                      placeholder="Введите вопрос"
                      value={question.question}
                      onChange={(e) =>
                        updateQuestion(question.id, e.target.value)
                      }
                      classNames={{
                        inputWrapper: "bg-white border border-gray-300",
                      }}
                    />
                  </div>

                  {/* Answer Options */}
                  <div>
                    <p className="text-sm font-medium mb-3">
                      Напишите ответы на вопросы, и выберите правильный
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {question.answers.map((answer, ansIndex) => (
                        <div
                          key={answer.id}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            size="sm"
                            isSelected={answer.isCorrect}
                            onValueChange={() =>
                              toggleCorrectAnswer(question.id, answer.id)
                            }
                          />
                          <Input
                            placeholder={`${ansIndex + 1} вариант`}
                            size="sm"
                            value={answer.text}
                            onChange={(e) =>
                              updateAnswer(
                                question.id,
                                answer.id,
                                e.target.value
                              )
                            }
                            classNames={{
                              inputWrapper: "bg-white border border-gray-300",
                            }}
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
                className="text-gray-600 border border-gray-300 px-6 rounded-full"
                startContent={<Plus size={18} />}
                onPress={addQuestion}
              >
                Добавить вопрос
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="light"
                  className="text-gray-600 px-6 rounded-full"
                  onPress={onClose}
                >
                  Отмена
                </Button>
                <Button
                  className="bg-[#2d2d2d] text-white px-8 rounded-full"
                  onPress={handleSubmit}
                  isLoading={isPending}
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
