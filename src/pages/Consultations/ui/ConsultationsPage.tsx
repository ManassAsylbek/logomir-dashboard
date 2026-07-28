import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { Search, ChevronLeft, ChevronRight, Phone, Clock } from "lucide-react";
import { useMemo, useState } from "react";

import {
  CONSULTATION_FORMAT_LABELS,
  CONSULTATION_STATUS_LABELS,
  ConsultationFormat,
  ConsultationRequest,
  ConsultationStatus,
} from "@/shared/api/consultations/types";
import { useConsultations } from "@/shared/services/consultations/useConsultations";

import ProcessConsultationModal from "./ProcessConsultationModal";

const STATUS_TABS: ConsultationStatus[] = [
  "new",
  "contacted",
  "scheduled",
  "rejected",
  "converted",
];

const STATUS_COLORS: Record<ConsultationStatus, string> = {
  new: "bg-[#22bb79] text-white",
  contacted: "bg-amber-100 text-amber-700",
  scheduled: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
  converted: "bg-blue-100 text-blue-700",
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

const formatDate = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "—";

function RequestCard({
  request,
  onOpen,
}: {
  request: ConsultationRequest;
  onOpen: (r: ConsultationRequest) => void;
}) {
  const statusLabel =
    request.status_display ?? CONSULTATION_STATUS_LABELS[request.status];
  const formatLabel =
    request.format_display ?? CONSULTATION_FORMAT_LABELS[request.format];

  return (
    <Card className="bg-white shadow-sm">
      <CardBody className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 leading-snug truncate">
              {request.full_name}
            </h3>
            <a
              href={`tel:${request.phone}`}
              className="text-sm text-gray-500 inline-flex items-center gap-1 mt-1 hover:text-gray-800"
            >
              <Phone size={12} />
              {request.phone}
            </a>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${STATUS_COLORS[request.status]}`}
          >
            {statusLabel}
          </span>
        </div>

        <div className="text-xs text-gray-500 flex gap-2 flex-wrap">
          <span className="px-2 py-0.5 rounded-full bg-gray-100">
            {formatLabel}
          </span>
          {request.branch_name && (
            <span className="px-2 py-0.5 rounded-full bg-gray-100">
              {request.branch_name}
            </span>
          )}
          {request.source && (
            <span className="px-2 py-0.5 rounded-full bg-gray-100">
              {request.source}
            </span>
          )}
        </div>

        {(request.child_name || request.child_age != null) && (
          <div className="text-sm text-gray-700">
            <span className="text-gray-500">Ребёнок: </span>
            {request.child_name ?? "—"}
            {request.child_age != null ? `, ${request.child_age} лет` : ""}
          </div>
        )}

        {request.message && (
          <p className="text-sm text-gray-600 italic line-clamp-2">
            «{request.message}»
          </p>
        )}

        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
          <Clock size={12} />
          Желаемое: {formatDateTime(request.desired_datetime)}
        </div>

        {request.scheduled_datetime && (
          <div className="text-xs text-green-700 flex items-center gap-1">
            <Clock size={12} />
            Подтверждено: {formatDateTime(request.scheduled_datetime)}
            {request.specialist_name ? ` · ${request.specialist_name}` : ""}
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <span className="text-[11px] text-gray-400">
            #{request.id} · {formatDate(request.created_at)}
          </span>
          <Button
            size="sm"
            color="success"
            variant="flat"
            className="rounded-full"
            onPress={() => onOpen(request)}
          >
            Открыть
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default function ConsultationsPage() {
  const [status, setStatus] = useState<ConsultationStatus>("new");
  const [format, setFormat] = useState<ConsultationFormat | "all">("all");
  const [search, setSearch] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");
  const [page, setPage] = useState(1);

  const [openRequest, setOpenRequest] = useState<ConsultationRequest | null>(
    null,
  );

  // simple debounce
  useMemo(() => {
    const t = setTimeout(() => {
      setSearchDebounced(search.trim());
      setPage(1);
    }, 300);

    return () => clearTimeout(t);
  }, [search]);

  const params = useMemo(
    () => ({
      page,
      status,
      ordering: "-created_at",
      ...(format !== "all" ? { format } : {}),
      ...(searchDebounced ? { search: searchDebounced } : {}),
    }),
    [page, status, format, searchDebounced],
  );

  const { data, isLoading, isError } = useConsultations(params);
  const { data: newCount } = useConsultations({
    status: "new",
    page: 1,
  });

  const total = data?.count ?? 0;
  const pageSize = data?.results?.length ?? 0;
  const hasNext = Boolean(data?.next);
  const hasPrev = Boolean(data?.previous);
  const totalPages = total ? Math.max(1, Math.ceil(total / 15)) : 1;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-medium">Заявки на консультацию</h1>
        <p className="text-sm text-gray-500 mt-1">
          Анонимные заявки с лендинга. Назначайте специалиста и подтверждайте
          время.
        </p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
        {STATUS_TABS.map((s) => {
          const active = status === s;
          const badge = s === "new" ? newCount?.count : undefined;

          return (
            <button
              key={s}
              type="button"
              onClick={() => {
                setStatus(s);
                setPage(1);
              }}
              className={`px-3 pb-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5 ${
                active
                  ? "border-[#22bb79] text-[#0e6b3f]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {CONSULTATION_STATUS_LABELS[s]}
              {badge ? (
                <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-[#22bb79] text-white font-semibold">
                  {badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <Input
          placeholder="Поиск по имени / телефону / ребёнку"
          startContent={<Search size={18} className="text-default-400" />}
          className="max-w-md"
          classNames={{ inputWrapper: "bg-white" }}
          variant="bordered"
          size="md"
          radius="full"
          value={search}
          onValueChange={setSearch}
        />
        <div className="flex gap-1 flex-wrap">
          {(["all", "online", "offline"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setFormat(f);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                format === f
                  ? "bg-[#22bb79] text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-gray-400"
              }`}
            >
              {f === "all"
                ? "Все форматы"
                : CONSULTATION_FORMAT_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : isError ? (
        <div className="py-16 text-center text-red-500">
          Не удалось загрузить заявки.
        </div>
      ) : pageSize === 0 ? (
        <div className="py-16 text-center text-gray-500">
          Заявок в статусе «{CONSULTATION_STATUS_LABELS[status]}» нет.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {data?.results.map((r) => (
              <RequestCard key={r.id} request={r} onOpen={setOpenRequest} />
            ))}
          </div>

          {/* Pagination */}
          {(hasNext || hasPrev) && (
            <div className="flex justify-center items-center gap-3 mt-4">
              <Button
                isIconOnly
                variant="bordered"
                isDisabled={!hasPrev}
                onPress={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={18} />
              </Button>
              <span className="text-sm text-gray-600">
                {page} / {totalPages}
              </span>
              <Button
                isIconOnly
                variant="bordered"
                isDisabled={!hasNext}
                onPress={() => setPage((p) => p + 1)}
              >
                <ChevronRight size={18} />
              </Button>
            </div>
          )}
        </>
      )}

      <ProcessConsultationModal
        isOpen={openRequest !== null}
        onClose={() => setOpenRequest(null)}
        request={openRequest}
      />
    </div>
  );
}
