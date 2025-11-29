import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { ArrowRight, Upload } from "lucide-react";

interface CreatePresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePresentationModal({
  isOpen,
  onClose,
}: CreatePresentationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl">
              Добавьте презентацию
            </ModalHeader>
            <ModalBody>
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 flex flex-col items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium">
                    Загрузите файл презентации (PDF)
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Файл должен весить не более 100 МБ
                  </p>
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Название
                </label>
                <Input
                  radius="full"
                  placeholder="Введите нашого развитие речи"
                  classNames={{
                    inputWrapper: "bg-white border",
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
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
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
