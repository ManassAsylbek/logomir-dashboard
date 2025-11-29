import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { ArrowRight } from "lucide-react";

interface CreateTherapistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTherapistModal({
  isOpen,
  onClose,
}: CreateTherapistModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 px-6 pt-6">
          <h2 className="text-2xl font-medium">Создание нового логопеда</h2>
        </ModalHeader>
        <ModalBody className="px-6 pb-6">
          <div className="flex flex-col gap-4">
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xl font-medium mb-4 block">Email</label>
                <Input
                  size="lg"
                  radius="full"
                  placeholder="logo@"
                  classNames={{
                    inputWrapper: "bg-white border-1 border-gray-300",
                    label: "text-xl",
                  }}
                />
              </div>
              <div>
                <label className="text-xl font-medium mb-4 block">
                  Телефон
                </label>
                <Input
                  size="lg"
                  radius="full"
                  placeholder="+ 996 (771) - 15 - 15 - 17"
                  classNames={{
                    inputWrapper: "bg-white border-1 border-gray-300",
                  }}
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xl font-medium mb-4 block">
                  Whatsapp
                </label>
                <Input
                  radius="full"
                  size="lg"
                  placeholder="+ 996 (771) - 15 - 15 - 17"
                  classNames={{
                    inputWrapper: "bg-white border-1 border-gray-300",
                    label: "text-xl",
                  }}
                />
              </div>
              <div>
                <label className="text-xl font-medium mb-4 block">
                  Telegram
                </label>
                <Input
                  size="lg"
                  radius="full"
                  placeholder="@logo"
                  classNames={{
                    inputWrapper: "bg-white border-1 border-gray-300",
                    label: "text-xl",
                  }}
                />
              </div>
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
                Создать сотрудника
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
