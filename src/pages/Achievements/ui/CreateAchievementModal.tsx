import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { useEffect, useRef, useState } from "react";
import { Upload, X } from "lucide-react";

import {
  Achievement,
  AchievementCategory,
  ACHIEVEMENT_CATEGORY_LABELS,
  AchievementFormPayload,
} from "@/shared/api/achievements/types";
import { useCreateAchievement } from "@/shared/services/achievements/useCreateAchievement";
import { useUpdateAchievement } from "@/shared/services/achievements/useUpdateAchievement";
import {
  ICON_PRESETS,
  fetchPresetAsBlob,
  iconPresetPath,
} from "@/pages/Achievements/lib/iconPresets";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** When provided — edit mode; otherwise create */
  achievement?: Achievement | null;
}

const CATEGORIES: AchievementCategory[] = [
  "study",
  "behavior",
  "activity",
  "progress",
  "other",
];

export default function CreateAchievementModal({
  isOpen,
  onClose,
  achievement,
}: Props) {
  const isEdit = Boolean(achievement);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<AchievementCategory>("other");
  const [points, setPoints] = useState<string>("0");

  /** preset filename from /public/achievement-icons/ (if user picked one) */
  const [presetFile, setPresetFile] = useState<string | null>(null);
  /** custom uploaded file (if user uploaded one) */
  const [customFile, setCustomFile] = useState<File | null>(null);
  /** preview URL of the currently selected icon (preset, custom, or existing) */
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const create = useCreateAchievement();
  const update = useUpdateAchievement();
  const isPending = create.isPending || update.isPending;

  useEffect(() => {
    if (!isOpen) return;
    if (achievement) {
      setName(achievement.name);
      setDescription(achievement.description ?? "");
      setCategory(achievement.category);
      setPoints(String(achievement.points));
      setPresetFile(null);
      setCustomFile(null);
      setIconPreview(achievement.icon ?? null);
    } else {
      setName("");
      setDescription("");
      setCategory("other");
      setPoints("0");
      setPresetFile(null);
      setCustomFile(null);
      setIconPreview(null);
    }
  }, [isOpen, achievement]);

  useEffect(() => {
    if (!customFile) return;
    const url = URL.createObjectURL(customFile);

    setIconPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [customFile]);

  const handlePickPreset = (file: string) => {
    setPresetFile(file);
    setCustomFile(null);
    setIconPreview(iconPresetPath(file));

    if (!isEdit) {
      const preset = ICON_PRESETS.find((p) => p.file === file);

      if (preset) {
        setName(preset.name);
        setDescription(preset.description ?? "");
        setCategory(preset.category);
        setPoints(String(preset.points));
      }
    }
  };

  const handlePickCustom = (file: File) => {
    setCustomFile(file);
    setPresetFile(null);
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;

    let iconBlob: Blob | undefined;

    if (customFile) {
      iconBlob = customFile;
    } else if (presetFile) {
      try {
        iconBlob = await fetchPresetAsBlob(presetFile);
      } catch {
        iconBlob = undefined;
      }
    }

    const payload: AchievementFormPayload = {
      name: name.trim(),
      description: description.trim(),
      category,
      points: Number(points) || 0,
      ...(iconBlob ? { icon: iconBlob } : {}),
    };

    if (isEdit && achievement) {
      update.mutate(
        { id: achievement.id, ...payload },
        { onSuccess: () => onClose() },
      );
    } else {
      create.mutate(payload, { onSuccess: () => onClose() });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="px-6 py-5 border-b text-xl font-medium">
              {isEdit ? "Редактирование ачивки" : "Создание ачивки"}
            </ModalHeader>

            <ModalBody className="px-6 py-5 flex flex-col gap-5">
              {/* Selected preview */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                  {iconPreview ? (
                    <img
                      src={iconPreview}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">нет иконки</span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Выберите одну из базовых иконок или загрузите свою.
                </div>
              </div>

              {/* Base icon gallery */}
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Базовые иконки
                </h4>
                <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                  {ICON_PRESETS.map((preset) => {
                    const selected = presetFile === preset.file;

                    return (
                      <button
                        key={preset.file}
                        type="button"
                        onClick={() => handlePickPreset(preset.file)}
                        className={`relative aspect-square rounded-xl border-2 transition-all overflow-hidden bg-white ${
                          selected
                            ? "border-[#22bb79] ring-2 ring-[#22bb79]/30"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                        title={preset.name}
                      >
                        <img
                          src={iconPresetPath(preset.file)}
                          alt={preset.name}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            const target = e.currentTarget;

                            target.style.opacity = "0.25";
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) handlePickCustom(file);
                      e.target.value = "";
                    }}
                  />
                  <Button
                    variant="bordered"
                    size="sm"
                    className="rounded-full"
                    startContent={<Upload size={14} />}
                    onPress={() => fileInputRef.current?.click()}
                  >
                    Загрузить свою
                  </Button>
                  {customFile && (
                    <span className="text-xs text-gray-500 truncate flex items-center gap-1">
                      {customFile.name}
                      <button
                        type="button"
                        onClick={() => {
                          setCustomFile(null);
                          setIconPreview(achievement?.icon ?? null);
                        }}
                        className="text-gray-400 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                </div>
              </div>

              {/* Form fields */}
              <Input
                label="Название"
                placeholder="Например, «Победитель звука Р»"
                value={name}
                onValueChange={setName}
                size="lg"
                variant="bordered"
                classNames={{ inputWrapper: "bg-white" }}
              />

              <Textarea
                label="Описание"
                placeholder="За что выдаётся ачивка"
                value={description}
                onValueChange={setDescription}
                minRows={2}
                variant="bordered"
                classNames={{ inputWrapper: "bg-white" }}
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Категория
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as AchievementCategory)
                    }
                    className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {ACHIEVEMENT_CATEGORY_LABELS[c]}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Баллы"
                  type="number"
                  value={points}
                  onValueChange={setPoints}
                  size="lg"
                  variant="bordered"
                  classNames={{ inputWrapper: "bg-white" }}
                />
              </div>
            </ModalBody>

            <ModalFooter className="px-6 pb-5 border-t flex justify-end gap-2">
              <Button
                variant="light"
                onPress={onClose}
                className="rounded-full text-gray-600 px-6"
              >
                Отмена
              </Button>
              <Button
                className="bg-[#2d2d2d] text-white rounded-full px-6"
                isDisabled={!name.trim()}
                isLoading={isPending}
                onPress={handleSubmit}
              >
                {isEdit ? "Сохранить" : "Создать"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
