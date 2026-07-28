import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { Progress } from "@heroui/progress";
import { useEffect, useMemo, useState } from "react";

import type { Student } from "@/shared/api/students/types";
import type { LessonType } from "@/shared/api/lessons/types";
import { useTariffs } from "@/shared/services/tariffs/useTariffs";
import { useUserTariffs } from "@/shared/services/userTariffs/useUserTariffs";
import { useCreateUserTariff } from "@/shared/services/userTariffs/useCreateUserTariff";
import { useCreateLessonsBulk } from "@/shared/services/lessons/useCreateLessonsBulk";
import { useSpecialists } from "@/shared/services/specialists/useSpecialists";
import { useBranches } from "@/shared/services/branches/useBranches";
import { useTimeSlots } from "@/shared/services/timeSlots/useTimeSlots";
import { buildBulkLessonsPayload } from "@/pages/Students/lib/buildBulkPayload";

type TabKey = "balance" | "lessons";

interface EnrollStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

function formatSlot(start: string | null, end: string | null): string {
  if (!start) return "—";
  const s = new Date(start);
  const date = s.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
  const startStr = s.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endStr = end
    ? new Date(end).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return endStr ? `${date} ${startStr}–${endStr}` : `${date} ${startStr}`;
}

export default function EnrollStudentModal({
  isOpen,
  onClose,
  student,
}: EnrollStudentModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("balance");

  // Issue-tariff state
  const [selectedTariff, setSelectedTariff] = useState<number | null>(null);

  // Booking state
  const [specialist, setSpecialist] = useState<number | null>(null);
  const [lessonType, setLessonType] = useState<LessonType>("online");
  const [branch, setBranch] = useState<number | null>(null);
  const [deductTariff, setDeductTariff] = useState<number | null>(null);
  const [name, setName] = useState("Курс");
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);

  useEffect(() => {
    if (isOpen) {
      setActiveTab("balance");
      setSelectedTariff(null);
      setSpecialist(null);
      setLessonType("online");
      setBranch(null);
      setDeductTariff(null);
      setName("Курс");
      setSelectedSlots([]);
    }
  }, [isOpen, student]);

  const fromISO = useMemo(() => new Date().toISOString(), [isOpen, student?.id]);

  const { data: tariffs = [], isLoading: tariffsLoading } = useTariffs();
  const { data: balance = [], isLoading: balanceLoading } = useUserTariffs(
    student?.id,
  );
  const { data: specialistsData } = useSpecialists();
  const { data: branchesData, isLoading: branchesLoading } = useBranches();
  const { data: slotsData, isLoading: slotsLoading } = useTimeSlots(
    { specialist: specialist ?? undefined, is_booked: false, start_time__gte: fromISO },
    Boolean(specialist) && isOpen,
  );

  const issueTariff = useCreateUserTariff();
  const bookLessons = useCreateLessonsBulk();

  const slots = slotsData?.results ?? [];
  const isOffline = lessonType === "offline";

  if (!student) return null;

  const toggleSlot = (id: number) => {
    setSelectedSlots((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleIssueTariff = () => {
    if (!selectedTariff) return;
    issueTariff.mutate(
      { user: student.id, tariff: selectedTariff },
      { onSuccess: () => setSelectedTariff(null) },
    );
  };

  const handleBook = () => {
    if (selectedSlots.length === 0) return;
    if (isOffline && !branch) return;

    bookLessons.mutate(
      buildBulkLessonsPayload({
        user: student.id,
        lessonType,
        branch,
        deductTariff,
        timeSlots: selectedSlots,
        name,
      }),
      { onSuccess: () => setSelectedSlots([]) },
    );
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: "balance", label: "Баланс и тариф" },
    { key: "lessons", label: "Записать на занятия" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="px-6 py-5 border-b text-xl font-medium flex flex-col items-start gap-1">
              <span>{student.full_name || student.username}</span>
              <span className="text-sm text-gray-500 font-normal">
                Выдача тарифа и запись на занятия
              </span>
            </ModalHeader>

            <ModalBody className="px-6 py-5">
              <div className="flex gap-2 border-b border-gray-200 mb-4 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-3 pb-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.key
                        ? "border-[#22bb79] text-[#0e6b3f]"
                        : "border-transparent text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === "balance" && (
                <div className="flex flex-col gap-5">
                  {/* Current balance */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Текущий баланс
                    </h4>
                    {balanceLoading ? (
                      <div className="flex justify-center py-4">
                        <Spinner size="sm" />
                      </div>
                    ) : balance.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        Тарифов пока нет
                      </p>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {balance.map((ut) => (
                          <div
                            key={ut.id}
                            className="rounded-xl border border-gray-200 p-3"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">
                                {ut.tariff_name ?? `Тариф #${ut.tariff}`}
                              </span>
                              <span className="text-sm text-gray-600">
                                осталось {ut.lessons_left}/{ut.lessons_total}
                              </span>
                            </div>
                            <Progress
                              value={
                                ut.lessons_total
                                  ? (ut.lessons_left / ut.lessons_total) * 100
                                  : 0
                              }
                              color="success"
                              size="sm"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Issue tariff */}
                  <div className="flex flex-col gap-2 border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-700">
                      Выдать тариф
                    </h4>
                    <select
                      value={selectedTariff ?? ""}
                      onChange={(e) =>
                        setSelectedTariff(
                          e.target.value ? Number(e.target.value) : null,
                        )
                      }
                      className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                    >
                      <option value="">
                        {tariffsLoading ? "Загрузка…" : "Выберите тариф"}
                      </option>
                      {tariffs.map((tr) => (
                        <option key={tr.id} value={tr.id}>
                          {tr.name} · {tr.lesson_count} зан. · {tr.price} сом
                        </option>
                      ))}
                    </select>
                    <div className="flex justify-end">
                      <Button
                        className="bg-[#2d2d2d] text-white rounded-full px-6"
                        isDisabled={!selectedTariff}
                        isLoading={issueTariff.isPending}
                        onPress={handleIssueTariff}
                      >
                        Выдать тариф
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "lessons" && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Специалист
                    </label>
                    <select
                      value={specialist ?? ""}
                      onChange={(e) => {
                        setSpecialist(
                          e.target.value ? Number(e.target.value) : null,
                        );
                        setSelectedSlots([]);
                      }}
                      className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                    >
                      <option value="">Выберите специалиста</option>
                      {specialistsData?.results?.map((sp) => (
                        <option key={sp.id} value={sp.id}>
                          {[sp.name, sp.last_name].filter(Boolean).join(" ") ||
                            `#${sp.id}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Тип занятия
                    </label>
                    <select
                      value={lessonType}
                      onChange={(e) =>
                        setLessonType(e.target.value as LessonType)
                      }
                      className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                    >
                      <option value="online">Онлайн</option>
                      <option value="offline">Оффлайн</option>
                    </select>
                  </div>

                  {isOffline && (
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700">
                        Филиал
                      </label>
                      <select
                        value={branch ?? ""}
                        onChange={(e) =>
                          setBranch(
                            e.target.value ? Number(e.target.value) : null,
                          )
                        }
                        className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                      >
                        <option value="">
                          {branchesLoading ? "Загрузка…" : "Выберите филиал"}
                        </option>
                        {branchesData?.results?.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name ?? `Филиал #${b.id}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Списать с тарифа (необязательно)
                    </label>
                    <select
                      value={deductTariff ?? ""}
                      onChange={(e) =>
                        setDeductTariff(
                          e.target.value ? Number(e.target.value) : null,
                        )
                      }
                      className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                    >
                      <option value="">Не списывать</option>
                      {balance.map((ut) => (
                        <option key={ut.id} value={ut.id}>
                          {ut.tariff_name ?? `Тариф #${ut.tariff}`} (осталось{" "}
                          {ut.lessons_left})
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="Название"
                    value={name}
                    onValueChange={setName}
                    size="lg"
                    variant="bordered"
                    classNames={{ inputWrapper: "bg-white" }}
                  />

                  {/* Slots */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Свободные слоты{" "}
                      {selectedSlots.length > 0 && `(выбрано ${selectedSlots.length})`}
                    </label>
                    {!specialist ? (
                      <p className="text-sm text-gray-500">
                        Сначала выберите специалиста
                      </p>
                    ) : slotsLoading ? (
                      <div className="flex justify-center py-6">
                        <Spinner />
                      </div>
                    ) : slots.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        Нет свободных слотов
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[260px] overflow-auto">
                        {slots.map((slot) => {
                          const active = selectedSlots.includes(slot.id);

                          return (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={() => toggleSlot(slot.id)}
                              className={`text-sm p-2 rounded-lg border transition-colors ${
                                active
                                  ? "border-[#22bb79] bg-[#e7f9f0] text-[#0e6b3f]"
                                  : "border-gray-200 bg-white hover:border-gray-400"
                              }`}
                            >
                              {formatSlot(slot.start_time, slot.end_time)}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      className="bg-[#2d2d2d] text-white rounded-full px-6"
                      isDisabled={
                        selectedSlots.length === 0 || (isOffline && !branch)
                      }
                      isLoading={bookLessons.isPending}
                      onPress={handleBook}
                    >
                      Записать ({selectedSlots.length})
                    </Button>
                  </div>
                </div>
              )}
            </ModalBody>

            <ModalFooter className="px-6 pb-5 border-t flex justify-end">
              <Button
                variant="light"
                onPress={onClose}
                className="rounded-full text-gray-600 px-6"
              >
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
