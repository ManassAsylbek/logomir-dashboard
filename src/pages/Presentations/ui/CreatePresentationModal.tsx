import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { ArrowRight, Upload, X, FileText } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useCreatePresentation } from "@/shared/services/presentations/useCreatePresentation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CreatePresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  description: string;
  link: string;
  file: File | null;
}

export function CreatePresentationModal({
  isOpen,
  onClose,
}: CreatePresentationModalProps) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      link: "",
      file: null,
    },
  });

  const { mutate: createPresentation, isPending } = useCreatePresentation();
  const [fileName, setFileName] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    createPresentation(
      {
        name: data.name,
        description: data.description,
        link: data.link,
        file: data.file,
      },
      {
        onSuccess: () => {
          reset();
          setFileName(null);
          onClose();
        },
      },
    );
  };

  const handleClose = () => {
    reset();
    setFileName(null);
    onClose();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      setFileName(file.name);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 px-6 pt-6">
          <h2 className="text-2xl font-medium">{t("presentations.createModal.title")}</h2>
        </ModalHeader>
        <ModalBody className="px-6 pb-6">
          <div className="flex flex-col gap-4">
            {/* File Upload */}
            <Controller
              name="file"
              control={control}
              render={({ field: { onChange } }) => (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t("presentations.createModal.fileLabel")}
                  </label>
                  {fileName ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center gap-3 bg-gray-50">
                      <div className="w-10 h-10 bg-[#22bb79] rounded-full flex items-center justify-center shrink-0">
                        <FileText className="text-white" size={20} />
                      </div>
                      <p className="text-sm text-gray-700 flex-1 truncate">
                        {fileName}
                      </p>
                      <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        variant="light"
                        onPress={() => {
                          onChange(null);
                          setFileName(null);
                        }}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                      <div className="w-12 h-12 bg-[#22bb79] rounded-full flex items-center justify-center mb-3">
                        <Upload className="text-white" size={24} />
                      </div>
                      <p className="text-sm text-gray-600">
                        {t("presentations.createModal.uploadHint")}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {t("presentations.createModal.fileSizeHint")}
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.ppt,.pptx"
                        onChange={(e) => handleFileChange(e, onChange)}
                      />
                    </label>
                  )}
                </div>
              )}
            />

            {/* Name */}
            <Controller
              name="name"
              control={control}
              rules={{ required: t("presentations.createModal.nameRequired") }}
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t("presentations.createModal.name")}
                  </label>
                  <Input
                    {...field}
                    placeholder="Новый метод развития речи"
                    classNames={{
                      inputWrapper: "bg-white border-1 border-gray-300",
                    }}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                </div>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t("presentations.createModal.description")}
                  </label>
                  <Textarea
                    {...field}
                    placeholder="Краткое описание презентации"
                    minRows={4}
                    classNames={{
                      inputWrapper: "bg-white border-1 border-gray-300",
                    }}
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                  />
                </div>
              )}
            />

            {/* Link */}
            <Controller
              name="link"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t("presentations.createModal.link")}
                  </label>
                  <Input
                    {...field}
                    placeholder="https://example.com"
                    classNames={{
                      inputWrapper: "bg-white border-1 border-gray-300",
                    }}
                    isInvalid={!!errors.link}
                    errorMessage={errors.link?.message}
                  />
                </div>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-start mt-4">
              <Button
                radius="full"
                size="lg"
                className="bg-[#2d2d2d] text-white w-fit pr-2"
                endContent={
                  <div className="right-2 w-9 h-9 bg-green-400 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-gray-800" />
                  </div>
                }
                onPress={() => handleSubmit(onSubmit)()}
                isLoading={isPending}
              >
                {t("presentations.createModal.submit")}
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
