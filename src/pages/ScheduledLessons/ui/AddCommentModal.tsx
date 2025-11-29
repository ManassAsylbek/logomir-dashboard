import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface AddCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonId: number | null;
}

export default function AddCommentModal({
  isOpen,
  onClose,
  lessonId,
}: AddCommentModalProps) {
  const [comment, setComment] = useState("");

  const handleSave = () => {
    console.log("Saving comment for lesson:", lessonId, comment);
    setComment("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      size="md"
      classNames={{
        base: "bg-white",
        header: "border-b border-default-200",
        body: "py-6",
        footer: "border-t border-default-200",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Добавьте примечание</h3>
        </ModalHeader>
        <ModalBody>
          <Textarea
            placeholder="Место для текста"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="bordered"
            size="lg"
            classNames={{
              input: "min-h-[100px]",
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            radius="full"
            className="bg-[#2d2d2d] hover:bg-gray-900 text-white w-full font-medium h-12 justify-start"
            onPress={handleSave}
            endContent={
              <div className="absolute right-2 w-9 h-9 bg-green-400 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-gray-800" />
              </div>
            }
          >
            Сохранить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
