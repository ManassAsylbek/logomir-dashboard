import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { ArrowRight, Upload } from "lucide-react";

interface CreateNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateNewsModal({
  isOpen,
  onClose,
}: CreateNewsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 px-6 pt-6">
          <h2 className="text-2xl font-medium">Добавьте новости</h2>
        </ModalHeader>
        <ModalBody className="px-6 pb-6">
          <div className="flex flex-col gap-4">
            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Добавьте фото к новости
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                <div className="w-12 h-12 bg-[#22bb79] rounded-full flex items-center justify-center mb-3">
                  <Upload className="text-white" size={24} />
                </div>
                <p className="text-sm text-gray-600">
                  Выберите или перетащите сюда файлы
                </p>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Заголовок
              </label>
              <Input
                placeholder="Новый метод развития речи"
                classNames={{
                  inputWrapper: "bg-white border-1 border-gray-300",
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Наполнение
              </label>
              <Textarea
                placeholder="Внесите полный текст статьи основного наполнения"
                minRows={6}
                classNames={{
                  inputWrapper: "bg-white border-1 border-gray-300",
                }}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-start mt-4">
              <Button
                radius="full"
                size="lg"
                className="bg-[#2d2d2d] text-white w-fit pr-2"
                endContent={
                  <div className=" right-2 w-9 h-9 bg-green-400 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-gray-800" />
                  </div>
                }
              >
                Добавить новость
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
