import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Phone, XCircle } from "lucide-react";

import {
  CONSULTATION_FORMAT_LABELS,
  CONSULTATION_STATUS_LABELS,
  ConsultationRequest,
} from "@/shared/api/consultations/types";
import { useUpdateConsultation } from "@/shared/services/consultations/useUpdateConsultation";
import { useSpecialists } from "@/shared/services/specialists/useSpecialists";
import { useTimeSlots } from "@/shared/services/timeSlots/useTimeSlots";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  request: ConsultationRequest | null;
}

const datetimeLocalValue = (iso: string | null | undefined): string => {
  if (!iso) return "";
  const d = new Date(iso);

  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}`
  );
};

const toIsoWithOffset = (local: string): string => {
  if (!local) return "";
  const d = new Date(local);

  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  const tz = -d.getTimezoneOffset();
  const sign = tz >= 0 ? "+" : "-";
  const hh = pad(Math.floor(Math.abs(tz) / 60));
  const mm = pad(Math.abs(tz) % 60);

  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}:00${sign}${hh}:${mm}`
  );
};

const formatDateTime = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

export default function ProcessConsultationModal({
  isOpen,
  onClose,
  request,
}: Props) {
  const [specialistId, setSpecialistId] = useState<number | null>(null);
  const [scheduledLocal, setScheduledLocal] = useState("");
  const [note, setNote] = useState("");

  const update = useUpdateConsultation();

  const branchId = request?.branch ?? undefined;
  const { data: specialistsData } = useSpecialists(
    branchId ? { branch: branchId } : {},
  );
  const nowIso = useMemo(() => new Date().toISOString(), [isOpen]);
  const { data: slotsData } = useTimeSlots(
    {
      specialist: specialistId ?? undefined,
      is_booked: false,
      start_time__gte: nowIso,
    },
    Boolean(specialistId) && isOpen,
  );

  useEffect(() => {
    if (!isOpen || !request) return;
    setSpecialistId(request.specialist ?? null);
    setScheduledLocal(datetimeLocalValue(request.scheduled_datetime));
    setNote(request.note ?? "");
  }, [isOpen, request]);

  if (!request) return null;

  const canSchedule = Boolean(specialistId) && Boolean(scheduledLocal);

  const patch = (
    payload: Parameters<typeof update.mutate>[0],
    onSuccess?: () => void,
  ) => {
    update.mutate(payload, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  const handleContacted = () => {
    patch(
      { id: request.id, status: "contacted", note },
      () => {},
    );
  };

  const handleScheduled = () => {
    if (!canSchedule || !specialistId) return;
    patch(
      {
        id: request.id,
        status: "scheduled",
        specialist: specialistId,
        scheduled_datetime: toIsoWithOffset(scheduledLocal),
        ...(note ? { note } : {}),
      },
      () => onClose(),
    );
  };

  const handleReject = () => {
    patch(
      {
        id: request.id,
        status: "rejected",
        ...(note ? { note } : {}),
      },
      () => onClose(),
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="px-6 py-5 border-b flex flex-col items-start gap-1">
              <span className="text-xl font-medium">
                {request.full_name}
                <span className="ml-2 text-sm text-gray-500">
                  {request.phone}
                </span>
              </span>
              <div className="text-xs text-gray-500 flex gap-2 flex-wrap">
                <span>
                  {request.format_display ??
                    CONSULTATION_FORMAT_LABELS[request.format]}
                </span>
                {request.branch_name && <span>· {request.branch_name}</span>}
                <span>
                  · Желаемое: {formatDateTime(request.desired_datetime)}
                </span>
                <span>
                  · Статус:{" "}
                  {request.status_display ??
                    CONSULTATION_STATUS_LABELS[request.status]}
                </span>
              </div>
            </ModalHeader>

            <ModalBody className="px-6 py-5 flex flex-col gap-4">
              {/* Child info / message */}
              {(request.child_name ||
                request.child_age ||
                request.message) && (
                <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-700 flex flex-col gap-1">
                  {(request.child_name || request.child_age) && (
                    <div>
                      <span className="text-gray-500">Ребёнок: </span>
                      {request.child_name ?? "—"}
                      {request.child_age != null
                        ? `, ${request.child_age} лет`
                        : ""}
                    </div>
                  )}
                  {request.message && (
                    <div>
                      <span className="text-gray-500">Комментарий: </span>«
                      {request.message}»
                    </div>
                  )}
                </div>
              )}

              {/* Assign specialist */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Специалист{" "}
                  {request.branch_name && (
                    <span className="text-xs text-gray-400">
                      (филиал «{request.branch_name}»)
                    </span>
                  )}
                </label>
                <select
                  value={specialistId ?? ""}
                  onChange={(e) => {
                    setSpecialistId(
                      e.target.value ? Number(e.target.value) : null,
                    );
                  }}
                  className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                >
                  <option value="">— Выберите специалиста —</option>
                  {specialistsData?.results?.map((sp) => (
                    <option key={sp.id} value={sp.id}>
                      {[sp.name, sp.last_name].filter(Boolean).join(" ") ||
                        `#${sp.id}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Scheduled datetime */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Подтверждённое время
                </label>
                <input
                  type="datetime-local"
                  value={scheduledLocal}
                  onChange={(e) => setScheduledLocal(e.target.value)}
                  className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                />
                {specialistId && (slotsData?.results?.length ?? 0) > 0 && (
                  <div className="mt-1">
                    <div className="text-xs text-gray-500 mb-1">
                      Свободные слоты у специалиста:
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {(slotsData?.results ?? []).slice(0, 8).map((slot) => (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() =>
                            setScheduledLocal(
                              datetimeLocalValue(slot.start_time),
                            )
                          }
                          className="text-xs px-2 py-1 rounded-lg border border-gray-200 bg-white hover:border-gray-400"
                        >
                          {slot.start_time
                            ? new Date(slot.start_time).toLocaleString("ru-RU", {
                                day: "2-digit",
                                month: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "—"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Note */}
              <Textarea
                label="Заметка"
                placeholder="Комментарий сотрудника — что обсудили, договорённости и т.д."
                value={note}
                onValueChange={setNote}
                minRows={2}
                variant="bordered"
                classNames={{ inputWrapper: "bg-white" }}
              />

              {/* Processed by hint */}
              {request.processed_by_name && (
                <p className="text-xs text-gray-400">
                  Обработал: {request.processed_by_name}
                  {request.processed_at
                    ? ` · ${formatDateTime(request.processed_at)}`
                    : ""}
                </p>
              )}

              {/* Loading hint */}
              {update.isPending && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Spinner size="sm" />
                  Сохраняем…
                </div>
              )}
            </ModalBody>

            <ModalFooter className="px-6 pb-5 border-t flex justify-between gap-2 flex-wrap">
              <Button
                variant="bordered"
                className="rounded-full"
                startContent={<Phone size={14} />}
                isDisabled={update.isPending}
                onPress={handleContacted}
              >
                Связались
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="light"
                  color="danger"
                  className="rounded-full"
                  startContent={<XCircle size={14} />}
                  isDisabled={update.isPending}
                  onPress={handleReject}
                >
                  Отказ
                </Button>
                <Button
                  className="bg-[#22bb79] text-white rounded-full px-6"
                  startContent={<CheckCircle2 size={14} />}
                  isDisabled={!canSchedule || update.isPending}
                  onPress={handleScheduled}
                >
                  Записать
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
