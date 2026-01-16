import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  type?: "danger" | "warning" | "info";
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Подтверждение действия",
  message = "Вы уверены, что хотите выполнить это действие?",
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  isLoading = false,
  type = "danger",
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getIconColor = () => {
    switch (type) {
      case "danger":
        return "text-danger";
      case "warning":
        return "text-warning";
      case "info":
        return "text-primary";
      default:
        return "text-danger";
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case "danger":
        return "bg-danger";
      case "warning":
        return "bg-warning";
      case "info":
        return "bg-primary";
      default:
        return "bg-danger";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${getIconColor()}`}>
                  <AlertTriangle size={24} />
                </div>
                <p className="text-gray-700">{message}</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                onPress={onClose}
                disabled={isLoading}
                className="rounded-full"
              >
                {cancelText}
              </Button>
              <Button
                className={`${getButtonColor()} text-white rounded-full`}
                onPress={handleConfirm}
                isLoading={isLoading}
              >
                {confirmText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
