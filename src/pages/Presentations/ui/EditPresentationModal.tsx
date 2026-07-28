import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { ArrowRight, Upload, X, FileText } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useUpdatePresentation } from "@/shared/services/presentations/useUpdatePresentation";
import { useState, useEffect } from "react";
import { Presentation } from "@/shared/api/presentations/types";

interface EditPresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  presentation: Presentation | null;
}

interface FormData {
  name: string;
  description: string;
  link: string;
  file: File | null;
}

export default function EditPresentationModal({
  isOpen,
  onClose,
  presentation,
}: EditPresentationModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      link: "",
      file: null,
    },
  });

  const { mutate: updatePresentation, isPending } = useUpdatePresentation();
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    if (presentation) {
      setValue("name", presentation.name);
      setValue("description", presentation.description);
      setValue("link", presentation.link || "");
      if (presentation.file) {
        const parts = presentation.file.split("/");
        setFileName(parts[parts.length - 1]);
      }
    }
  }, [presentation, setValue]);

  const onSubmit = (data: FormData) => {
    if (!presentation) return;

    updatePresentation(
      {
        id: presentation.id,
        data: {
          name: data.name,
          description: data.description,
          link: data.link,
          file: data.file,
        },
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

  if (!presentation) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 px-6 pt-6">
          <h2 className="text-2xl font-medium">Редактировать презентацию</h2>
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
                    Файл презентации (PDF)
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
                        Выберите или перетащите сюда файл
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
              rules={{ required: "Название обязательно" }}
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Название
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
                    Описание
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
                    Ссылка
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
                Сохранить изменения
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
