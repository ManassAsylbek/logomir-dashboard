import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Upload } from "lucide-react";
import { Checkbox } from "@heroui/checkbox";

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateGameModal({ isOpen, onClose }: CreateGameModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center justify-between px-8 py-6">
              <span className="text-2xl font-medium">Создание игры</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="light"
                  className="text-success border border-success rounded-full px-4"
                >
                  Далее Ⓘ
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  className="text-gray-600 border border-gray-300 rounded-full px-4"
                >
                  ЗНГ Ⓘ
                </Button>
              </div>
            </ModalHeader>
            <ModalBody className="px-8 pb-8">
              {/* Game Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Название игры
                </label>
                <Input
                  placeholder="Игра 1"
                  classNames={{
                    inputWrapper: "bg-white border border-gray-300",
                  }}
                />
              </div>

              {/* Question 1 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Вопрос №1</h3>

                {/* Image Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center gap-3 mb-4 bg-[#f0fdf4]">
                  <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Загрузите картинку</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Файл должен весить не более 100 МБ
                    </p>
                  </div>
                </div>

                {/* Question Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Вопрос
                  </label>
                  <Input
                    placeholder="Контекс"
                    classNames={{
                      inputWrapper: "bg-white border border-gray-300",
                    }}
                  />
                </div>

                {/* Answer Options */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-3">
                    Напишите ответы на вопросы, и выберите правильный
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Checkbox size="sm" />
                      <Input
                        placeholder="1 вариант"
                        size="sm"
                        classNames={{
                          inputWrapper: "bg-white border border-gray-300",
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox size="sm" />
                      <Input
                        placeholder="2 вариант"
                        size="sm"
                        classNames={{
                          inputWrapper: "bg-white border border-gray-300",
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox size="sm" defaultSelected />
                      <Input
                        placeholder="3 вариант"
                        size="sm"
                        classNames={{
                          inputWrapper: "bg-white border border-gray-300",
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox size="sm" />
                      <Input
                        placeholder="4 вариант"
                        size="sm"
                        classNames={{
                          inputWrapper: "bg-white border border-gray-300",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Question 2 */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Вопрос №2</h3>

                {/* Image Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center gap-3 mb-4 bg-[#f0fdf4]">
                  <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Загрузите картинку</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Файл должен весить не более 100 МБ
                    </p>
                  </div>
                </div>

                {/* Question Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Вопрос
                  </label>
                  <Input
                    placeholder="Контекс"
                    classNames={{
                      inputWrapper: "bg-white border border-gray-300",
                    }}
                  />
                </div>

                {/* Answer Options */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-3">
                    Напишите ответы на вопросы, и выберите правильный
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Checkbox size="sm" />
                      <Input
                        placeholder="1 вариант"
                        size="sm"
                        classNames={{
                          inputWrapper: "bg-white border border-gray-300",
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox size="sm" />
                      <Input
                        placeholder="2 вариант"
                        size="sm"
                        classNames={{
                          inputWrapper: "bg-white border border-gray-300",
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox size="sm" />
                      <Input
                        placeholder="3 вариант"
                        size="sm"
                        classNames={{
                          inputWrapper: "bg-white border border-gray-300",
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox size="sm" />
                      <Input
                        placeholder="4 вариант"
                        size="sm"
                        classNames={{
                          inputWrapper: "bg-white border border-gray-300",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="px-8 pb-6">
              <Button
                className="bg-[#2d2d2d] text-white px-8 rounded-full"
                endContent={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 10h12m0 0l-4-4m4 4l-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                onPress={onClose}
              >
                Сохранить
              </Button>
              <Button
                variant="light"
                className="text-gray-600 border border-gray-300 px-8 rounded-full"
                endContent={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 10h12m0 0l-4-4m4 4l-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Добавить вопрос
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
