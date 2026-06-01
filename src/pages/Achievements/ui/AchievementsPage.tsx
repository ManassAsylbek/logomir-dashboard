import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { Plus, Search, Edit, Trash2, Award, X } from "lucide-react";
import { useMemo, useState } from "react";

import {
  Achievement,
  AchievementCategory,
  ACHIEVEMENT_CATEGORY_LABELS,
  UserAchievement,
} from "@/shared/api/achievements/types";
import { useAchievements } from "@/shared/services/achievements/useAchievements";
import { useDeleteAchievement } from "@/shared/services/achievements/useDeleteAchievement";
import { useUserAchievements } from "@/shared/services/achievements/useUserAchievements";
import { useDeleteUserAchievement } from "@/shared/services/achievements/useDeleteUserAchievement";
import { useStudents } from "@/shared/services/students/useStudents";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";

import CreateAchievementModal from "./CreateAchievementModal";
import GrantAchievementModal from "./GrantAchievementModal";

type Tab = "catalog" | "students";

const CATEGORIES: (AchievementCategory | "all")[] = [
  "all",
  "study",
  "behavior",
  "activity",
  "progress",
  "other",
];

const categoryLabel = (c: AchievementCategory | "all") =>
  c === "all" ? "Все" : ACHIEVEMENT_CATEGORY_LABELS[c];

function AchievementCard({
  achievement,
  onEdit,
  onDelete,
  onGrant,
}: {
  achievement: Achievement;
  onEdit: (a: Achievement) => void;
  onDelete: (a: Achievement) => void;
  onGrant: (a: Achievement) => void;
}) {
  return (
    <Card className="bg-white shadow-sm">
      <CardBody className="p-5 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
            {achievement.icon ? (
              <img
                src={achievement.icon}
                alt={achievement.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <Award size={26} className="text-gray-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 leading-snug">
              {achievement.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#e7f9f0] text-[#0e6b3f] font-medium">
                {achievement.category_display ??
                  ACHIEVEMENT_CATEGORY_LABELS[achievement.category]}
              </span>
              <span className="text-xs text-gray-500">
                {achievement.points} б.
              </span>
            </div>
          </div>
        </div>
        {achievement.description && (
          <p className="text-sm text-gray-600 leading-snug line-clamp-3">
            {achievement.description}
          </p>
        )}
        <div className="flex justify-end gap-2 mt-1">
          <Button
            size="sm"
            variant="bordered"
            className="rounded-full"
            startContent={<Award size={14} />}
            onPress={() => onGrant(achievement)}
          >
            Выдать
          </Button>
          <Button
            size="sm"
            isIconOnly
            variant="light"
            onPress={() => onEdit(achievement)}
            aria-label="Редактировать"
          >
            <Edit size={16} />
          </Button>
          <Button
            size="sm"
            isIconOnly
            variant="light"
            color="danger"
            onPress={() => onDelete(achievement)}
            aria-label="Удалить"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

function GrantedCard({
  ua,
  onRevoke,
}: {
  ua: UserAchievement;
  onRevoke: (ua: UserAchievement) => void;
}) {
  const a = ua.achievement_detail;

  return (
    <Card className="bg-white shadow-sm">
      <CardBody className="p-4 flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
          {a?.icon ? (
            <img
              src={a.icon}
              alt={a.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <Award size={22} className="text-gray-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-900 text-sm leading-snug">
            {a?.name ?? `Ачивка #${ua.achievement}`}
          </div>
          {a?.points != null && (
            <div className="text-xs text-gray-500 mt-0.5">{a.points} б.</div>
          )}
          {ua.comment && (
            <p className="text-xs text-gray-600 mt-1 italic line-clamp-2">
              «{ua.comment}»
            </p>
          )}
          {ua.awarded_at && (
            <div className="text-[11px] text-gray-400 mt-1">
              {new Date(ua.awarded_at).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          )}
        </div>
        <Button
          size="sm"
          isIconOnly
          variant="light"
          onPress={() => onRevoke(ua)}
          aria-label="Снять"
        >
          <X size={16} />
        </Button>
      </CardBody>
    </Card>
  );
}

export default function AchievementsPage() {
  const [tab, setTab] = useState<Tab>("catalog");

  // Catalog tab state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<AchievementCategory | "all">("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Achievement | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Achievement | null>(null);

  // Grant modal state
  const [grantOpen, setGrantOpen] = useState(false);
  const [grantStudentId, setGrantStudentId] = useState<number | null>(null);
  const [grantInitial, setGrantInitial] = useState<Achievement | null>(null);

  // Students tab state
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [revokeTarget, setRevokeTarget] = useState<UserAchievement | null>(null);

  const catalogParams = useMemo(
    () => ({
      ...(search.trim() ? { search: search.trim() } : {}),
      ...(category !== "all" ? { category } : {}),
    }),
    [search, category],
  );

  const { data: achievements = [], isLoading: catalogLoading } =
    useAchievements(catalogParams);
  const removeAchievement = useDeleteAchievement();

  const { data: students } = useStudents();
  const { data: studentAwards = [], isLoading: awardsLoading } =
    useUserAchievements(
      { user: selectedStudent ?? undefined },
      Boolean(selectedStudent) && tab === "students",
    );
  const revokeAward = useDeleteUserAchievement();

  const openGrant = (achievement: Achievement | null, studentId?: number | null) => {
    setGrantInitial(achievement);
    setGrantStudentId(studentId ?? null);
    setGrantOpen(true);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "catalog", label: "Каталог" },
    { key: "students", label: "По ученикам" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2 border-b border-gray-200">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`px-3 pb-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                tab === t.key
                  ? "border-[#22bb79] text-[#0e6b3f]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {tab === "catalog" && (
          <Button
            color="success"
            className="rounded-full"
            startContent={<Plus size={16} />}
            onPress={() => setIsCreateOpen(true)}
          >
            Создать ачивку
          </Button>
        )}
        {tab === "students" && (
          <Button
            color="success"
            className="rounded-full"
            startContent={<Award size={16} />}
            isDisabled={!selectedStudent}
            onPress={() => openGrant(null, selectedStudent)}
          >
            Выдать ачивку
          </Button>
        )}
      </div>

      {/* CATALOG */}
      {tab === "catalog" && (
        <>
          <div className="flex items-center gap-3 flex-wrap">
            <Input
              placeholder="Поиск ачивок..."
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
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    category === c
                      ? "bg-[#22bb79] text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {categoryLabel(c)}
                </button>
              ))}
            </div>
          </div>

          {catalogLoading ? (
            <div className="flex justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : achievements.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              Ачивки не найдены
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((a) => (
                <AchievementCard
                  key={a.id}
                  achievement={a}
                  onEdit={setEditTarget}
                  onDelete={setDeleteTarget}
                  onGrant={(ach) => openGrant(ach, null)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* STUDENTS */}
      {tab === "students" && (
        <>
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={selectedStudent ?? ""}
              onChange={(e) =>
                setSelectedStudent(e.target.value ? Number(e.target.value) : null)
              }
              className="h-11 rounded-full border border-gray-300 bg-white px-4 text-sm min-w-[260px]"
            >
              <option value="">— Выберите ученика —</option>
              {students?.results?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.full_name || s.username}
                </option>
              ))}
            </select>
          </div>

          {!selectedStudent ? (
            <div className="py-16 text-center text-gray-500">
              Выберите ученика, чтобы увидеть его награды
            </div>
          ) : awardsLoading ? (
            <div className="flex justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : studentAwards.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              У ученика пока нет ачивок
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {studentAwards.map((ua) => (
                <GrantedCard key={ua.id} ua={ua} onRevoke={setRevokeTarget} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Create */}
      <CreateAchievementModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      {/* Edit */}
      <CreateAchievementModal
        isOpen={editTarget !== null}
        onClose={() => setEditTarget(null)}
        achievement={editTarget}
      />

      {/* Delete confirm */}
      <ConfirmModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title="Удаление ачивки"
        message={`Удалить ачивку «${deleteTarget?.name ?? ""}»? Это действие нельзя отменить.`}
        confirmText="Удалить"
        isLoading={removeAchievement.isPending}
        onConfirm={() => {
          if (deleteTarget) {
            removeAchievement.mutate(deleteTarget.id, {
              onSuccess: () => setDeleteTarget(null),
            });
          }
        }}
      />

      {/* Revoke confirm */}
      <ConfirmModal
        isOpen={revokeTarget !== null}
        onClose={() => setRevokeTarget(null)}
        title="Снять ачивку"
        message={`Снять у ученика ачивку «${
          revokeTarget?.achievement_detail?.name ?? ""
        }»?`}
        confirmText="Снять"
        isLoading={revokeAward.isPending}
        onConfirm={() => {
          if (revokeTarget) {
            revokeAward.mutate(revokeTarget.id, {
              onSuccess: () => setRevokeTarget(null),
            });
          }
        }}
      />

      {/* Grant */}
      <GrantAchievementModal
        isOpen={grantOpen}
        onClose={() => setGrantOpen(false)}
        initialStudentId={grantStudentId}
        initialAchievement={grantInitial}
      />
    </div>
  );
}
