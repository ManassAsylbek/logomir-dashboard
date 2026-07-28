import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useCreateSpecialist } from "@/shared/services/specialists/useCreateSpecialist";
import { useTranslation } from "react-i18next";
import {
  PHONE_COUNTRY_CODE,
  isValidPhone,
  normalizePhone,
} from "@/shared/lib/phone";

interface CreateTherapistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTherapistModal({
  isOpen,
  onClose,
}: CreateTherapistModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    phone_number: PHONE_COUNTRY_CODE,
    description: "",
    raiting: 0,
  });

  const { mutate: createSpecialist, isPending } = useCreateSpecialist();

  const handleSubmit = () => {
    if (!formData.name || !isValidPhone(formData.phone_number)) {
      alert(t("therapists.createModal.title"));
      return;
    }

    createSpecialist(formData, {
      onSuccess: () => {
        setFormData({
          name: "",
          last_name: "",
          phone_number: PHONE_COUNTRY_CODE,
          description: "",
          raiting: 0,
        });
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 px-6 pt-6">
          <h2 className="text-2xl font-medium">
            {t("therapists.createModal.title")}
          </h2>
        </ModalHeader>
        <ModalBody className="px-6 pb-6">
          <div className="flex flex-col gap-4">
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xl font-medium mb-4 block">
                  {t("therapists.createModal.firstName")}
                </label>
                <Input
                  size="lg"
                  radius="full"
                  placeholder={t("therapists.createModal.firstName")}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  classNames={{
                    inputWrapper: "bg-white border-1 border-gray-300",
                    label: "text-xl",
                  }}
                />
              </div>
              <div>
                <label className="text-xl font-medium mb-4 block">
                  {t("therapists.createModal.lastName")}
                </label>
                <Input
                  size="lg"
                  radius="full"
                  placeholder={t("therapists.createModal.lastName")}
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
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
                  {t("therapists.phone")}
                </label>
                <Input
                  type="tel"
                  inputMode="tel"
                  radius="full"
                  size="lg"
                  placeholder="+996 700 000 000"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone_number: normalizePhone(e.target.value),
                    })
                  }
                  classNames={{
                    inputWrapper: "bg-white border-1 border-gray-300",
                    label: "text-xl",
                  }}
                />
              </div>
              <div>
                <label className="text-xl font-medium mb-4 block">
                  {t("therapists.rating")}
                </label>
                <Input
                  size="lg"
                  radius="full"
                  type="number"
                  placeholder="0"
                  value={formData.raiting.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      raiting: parseInt(e.target.value) || 0,
                    })
                  }
                  classNames={{
                    inputWrapper: "bg-white border-1 border-gray-300",
                    label: "text-xl",
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xl font-medium mb-4 block">
                {t("therapists.description")}
              </label>
              <Textarea
                radius="lg"
                placeholder={t("therapists.description")}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                classNames={{
                  inputWrapper: "bg-white border-1 border-gray-300",
                }}
                minRows={3}
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
                onPress={handleSubmit}
                isLoading={isPending}
              >
                {t("therapists.createModal.submit")}
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
