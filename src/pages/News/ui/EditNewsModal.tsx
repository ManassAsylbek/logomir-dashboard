import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { ArrowRight, Upload, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useUpdateNews } from "@/shared/services/news/useUpdateNews";
import { useState, useEffect } from "react";
import { News } from "@/shared/api/news/types";

interface EditNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: News | null;
}

interface FormData {
  name: string;
  decription: string;
  link: string;
  image: File | null;
}

export default function EditNewsModal({
  isOpen,
  onClose,
  news,
}: EditNewsModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      decription: "",
      link: "",
      image: null,
    },
  });

  const { mutate: updateNews, isPending } = useUpdateNews();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (news) {
      setValue("name", news.name);
      setValue("decription", news.decription);
      setValue("link", news.link || "");
      if (news.image) {
        setImagePreview(news.image);
      }
    }
  }, [news, setValue]);

  const onSubmit = (data: FormData) => {
    if (!news) return;

    updateNews(
      {
        id: news.id,
        data: {
          name: data.name,
          decription: data.decription,
          link: data.link,
          image: data.image,
        },
      },
      {
        onSuccess: () => {
          reset();
          setImagePreview(null);
          onClose();
        },
      }
    );
  };

  const handleClose = () => {
    reset();
    setImagePreview(null);
    onClose();
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (onChange: (value: File | null) => void) => {
    onChange(null);
    setImagePreview(null);
  };

  if (!news) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 px-6 pt-6">
          <h2 className="text-2xl font-medium">Редактировать новость</h2>
        </ModalHeader>
        <ModalBody className="px-6 pb-6">
          <div className="flex flex-col gap-4">
            {/* Image Upload */}
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Добавьте фото к новости
                  </label>
                  {imagePreview ? (
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover"
                      />
                      <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        className="absolute top-2 right-2"
                        onPress={() => removeImage(onChange)}
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
                        Выберите или перетащите сюда файлы
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, onChange)}
                      />
                    </label>
                  )}
                </div>
              )}
            />

            {/* Title */}
            <Controller
              name="name"
              control={control}
              rules={{ required: "Заголовок обязателен" }}
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Заголовок
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
              name="decription"
              control={control}
              rules={{ required: "Описание обязательно" }}
              render={({ field }) => (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Наполнение
                  </label>
                  <Textarea
                    {...field}
                    placeholder="Внесите полный текст статьи основного наполнения"
                    minRows={6}
                    classNames={{
                      inputWrapper: "bg-white border-1 border-gray-300",
                    }}
                    isInvalid={!!errors.decription}
                    errorMessage={errors.decription?.message}
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
                  <div className=" right-2 w-9 h-9 bg-green-400 rounded-full flex items-center justify-center">
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
