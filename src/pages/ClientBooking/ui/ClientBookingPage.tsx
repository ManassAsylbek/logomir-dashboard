import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { Progress } from "@heroui/progress";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { ArrowRight, CheckCircle2, Phone, UserPlus, Wallet } from "lucide-react";

import { getStudents } from "@/shared/api/students/getStudents";
import { Student } from "@/shared/api/students/types";
import { Tariff } from "@/shared/api/tariffs/types";
import { LessonType } from "@/shared/api/lessons/types";
import { useRegister } from "@/shared/services/auth/useRegister";
import { useTariffs } from "@/shared/services/tariffs/useTariffs";
import { useUserTariffs } from "@/shared/services/userTariffs/useUserTariffs";
import { useBranches } from "@/shared/services/branches/useBranches";
import { useSpecialists } from "@/shared/services/specialists/useSpecialists";
import { useTimeSlots } from "@/shared/services/timeSlots/useTimeSlots";
import { useCreatePayment } from "@/shared/services/payments/useCreatePayment";
import { useConfirmPayment } from "@/shared/services/payments/useConfirmPayment";
import { useCreateLesson } from "@/shared/services/lessons/useCreateLesson";
import {
  PHONE_COUNTRY_CODE,
  isValidPhone,
  normalizePhone,
} from "@/shared/lib/phone";

type Step =
  | "phone"
  | "register"
  | "existing"
  | "tariff"
  | "balance_book"
  | "done";

interface DoneResult {
  message: string;
  lessonName?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  meetLink?: string | null;
  branchName?: string | null;
}

const digitsOnly = (raw: string) => raw.replace(/\D/g, "");

async function findStudentByPhone(phone: string): Promise<Student | null> {
  const target = digitsOnly(phone);
  let page = 1;

  while (page <= 10) {
    const { data } = await getStudents(page);
    const found = data.results.find((s) => {
      const p = digitsOnly(s.phone_number ?? "");
      const u = digitsOnly(s.username ?? "");

      return p === target || u === target;
    });

    if (found) return found;
    if (!data.next) return null;
    page += 1;
  }

  return null;
}

function formatSlot(start: string | null, end: string | null): string {
  if (!start) return "—";
  const s = new Date(start);
  const date = s.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
  });
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

const STEP_TITLES: Record<Step, string> = {
  phone: "Шаг 1. Телефон клиента",
  register: "Шаг 2. Данные клиента",
  existing: "Клиент найден",
  tariff: "Выбор тарифа и оплата",
  balance_book: "Запись из текущего тарифа",
  done: "Готово",
};

export default function ClientBookingPage() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState(PHONE_COUNTRY_CODE);
  const [userId, setUserId] = useState<number | null>(null);
  const [foundStudent, setFoundStudent] = useState<Student | null>(null);
  const [lookupPending, setLookupPending] = useState(false);

  const [newUser, setNewUser] = useState({
    full_name: "",
    password: "",
    age: "",
    gender: "Male" as "Male" | "Female",
    is_child: true,
  });

  const [selectedTariff, setSelectedTariff] = useState<number | null>(null);
  const [lessonType, setLessonType] = useState<LessonType>("online");
  const [branchId, setBranchId] = useState<number | null>(null);
  const [specialistId, setSpecialistId] = useState<number | null>(null);
  const [slotId, setSlotId] = useState<number | null>(null);
  const [userTariffId, setUserTariffId] = useState<number | null>(null);

  const [result, setResult] = useState<DoneResult | null>(null);

  const register = useRegister();
  const createPayment = useCreatePayment();
  const confirmPayment = useConfirmPayment();
  const createLesson = useCreateLesson();

  const isOffline = lessonType === "offline";

  const { data: balance = [], isLoading: balanceLoading } = useUserTariffs(
    userId ?? undefined,
  );
  const { data: tariffsList = [], isLoading: tariffsLoading } = useTariffs();
  const { data: branchesData, isLoading: branchesLoading } = useBranches();
  const specialistsParams = useMemo(
    () => (isOffline && branchId ? { branch: branchId } : {}),
    [isOffline, branchId],
  );
  const { data: specialistsData } = useSpecialists(specialistsParams);
  const { data: slotsData, isLoading: slotsLoading } = useTimeSlots(
    { specialist: specialistId ?? undefined, is_booked: false },
    Boolean(specialistId),
  );

  const tariffsArr: Tariff[] = useMemo(
    () => (Array.isArray(tariffsList) ? tariffsList : []),
    [tariffsList],
  );
  const slots = slotsData?.results ?? [];
  const branches = branchesData?.results ?? [];
  const specialists = specialistsData?.results ?? [];
  const availableTariffs = balance.filter((b) => b.lessons_left > 0);

  const resetSelections = () => {
    setSelectedTariff(null);
    setLessonType("online");
    setBranchId(null);
    setSpecialistId(null);
    setSlotId(null);
    setUserTariffId(null);
  };

  const resetAll = () => {
    setStep("phone");
    setPhone(PHONE_COUNTRY_CODE);
    setUserId(null);
    setFoundStudent(null);
    setNewUser({
      full_name: "",
      password: "",
      age: "",
      gender: "Male",
      is_child: true,
    });
    resetSelections();
    setResult(null);
  };

  // ── Handlers ─────────────────────────────────────────────────────────

  /**
   * Phone step.
   * Backend no longer requires OTP for staff registration, so we just look
   * the client up in /accounts/children/. If found → existing flow; if not
   * → register form. Conflict on submit (number already taken) is handled
   * inside handleRegister as a fallback.
   */
  const handlePhoneSubmit = async () => {
    if (!isValidPhone(phone)) {
      toast.error("Введите номер в формате +996 XXX XXX XXX");

      return;
    }
    setLookupPending(true);
    try {
      const student = await findStudentByPhone(phone);

      if (student) {
        setFoundStudent(student);
        setUserId(student.id);
        setStep("existing");
      } else {
        setStep("register");
      }
    } catch {
      toast.error("Не удалось проверить клиента, попробуйте ещё раз");
    } finally {
      setLookupPending(false);
    }
  };

  const handleRegister = () => {
    if (!newUser.full_name.trim()) {
      toast.error("Укажите имя клиента");

      return;
    }
    if (newUser.password.length < 6) {
      toast.error("Пароль не короче 6 символов");

      return;
    }

    register.mutate(
      {
        username: phone.trim(),
        password: newUser.password,
        full_name: newUser.full_name.trim(),
        age: newUser.age ? Number(newUser.age) : undefined,
        gender: newUser.gender,
        is_child: newUser.is_child,
      },
      {
        onSuccess: async (res) => {
          let id: number | null = res.data.id ?? null;

          if (!id) {
            const student = await findStudentByPhone(phone);

            id = student?.id ?? null;
          }
          if (!id) {
            toast.error("Не удалось получить id клиента — попробуйте ещё раз");

            return;
          }
          setUserId(id);
          resetSelections();
          setStep("tariff");
          toast.success("Клиент создан");
        },
        onError: async (e: any) => {
          const data = e?.response?.data;
          const usernameErr = Array.isArray(data?.username)
            ? data.username[0]
            : data?.username;

          // Treat duplicate-number response as "user already exists" and
          // pivot into the existing-client flow.
          if (
            typeof usernameErr === "string" &&
            (usernameErr.includes("уже существует") ||
              usernameErr.toLowerCase().includes("логин"))
          ) {
            try {
              const student = await findStudentByPhone(phone);

              if (student) {
                setFoundStudent(student);
                setUserId(student.id);
                setStep("existing");
                toast("Клиент уже существует — открыли его профиль", {
                  icon: "ℹ️",
                });

                return;
              }
            } catch {
              // fall through to generic toast
            }
          }

          const passwordErr = Array.isArray(data?.password)
            ? data.password[0]
            : data?.password;
          const msg =
            usernameErr ??
            passwordErr ??
            data?.non_field_errors?.[0] ??
            data?.detail ??
            "Ошибка регистрации";

          toast.error(typeof msg === "string" ? msg : "Ошибка регистрации");
        },
      },
    );
  };

  const handleConfirmTariff = () => {
    if (!userId || !selectedTariff || !specialistId || !slotId) {
      toast.error("Заполните все поля");

      return;
    }
    if (isOffline && !branchId) {
      toast.error("Для оффлайн-урока нужно указать филиал");

      return;
    }
    const tariff = tariffsArr.find((t) => t.id === selectedTariff);

    if (!tariff) return;

    createPayment.mutate(
      {
        user: userId,
        tariff: selectedTariff,
        specialist: specialistId,
        first_slot: slotId,
        amount: tariff.price,
        lesson_type: lessonType,
        status: "pending",
      },
      {
        onSuccess: (payRes) => {
          confirmPayment.mutate(payRes.data.id, {
            onSuccess: (confRes) => {
              const l = confRes.data.lesson;

              setResult({
                message: "Оплата подтверждена, занятие создано",
                lessonName: l?.name ?? null,
                startTime: l?.start_time ?? null,
                endTime: l?.end_time ?? null,
                meetLink: l?.meet_link ?? null,
                branchName: l?.branch_name ?? null,
              });
              setStep("done");
            },
            onError: (e: any) =>
              toast.error(
                e?.response?.data?.detail ?? "Не удалось подтвердить оплату",
              ),
          });
        },
        onError: (e: any) => {
          const d = e?.response?.data;
          const msg =
            d?.detail ?? d?.first_slot ?? d?.non_field_errors?.[0] ?? "Не удалось создать платёж";

          toast.error(typeof msg === "string" ? msg : "Не удалось создать платёж");
        },
      },
    );
  };

  const handleBookFromBalance = () => {
    if (!userId || !userTariffId || !specialistId || !slotId) {
      toast.error("Заполните все поля");

      return;
    }
    if (isOffline && !branchId) {
      toast.error("Для оффлайн-урока нужно указать филиал");

      return;
    }

    createLesson.mutate(
      {
        user: userId,
        user_tariff: userTariffId,
        lesson_type: lessonType,
        time_slot: slotId,
        ...(isOffline ? { branch: branchId as number } : {}),
        name: "Урок",
      },
      {
        onSuccess: (lesson) => {
          setResult({
            message: "Занятие создано из баланса",
            lessonName: lesson.name,
            startTime: lesson.start_time,
            endTime: lesson.end_time,
            meetLink: lesson.meet_link ?? null,
            branchName: lesson.branch_name ?? null,
          });
          setStep("done");
        },
      },
    );
  };

  // ── Render helpers ───────────────────────────────────────────────────

  const renderBookingFormFields = () => (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Тип урока</label>
        <select
          value={lessonType}
          onChange={(e) => {
            setLessonType(e.target.value as LessonType);
            setSpecialistId(null);
            setSlotId(null);
          }}
          className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
        >
          <option value="online">Онлайн</option>
          <option value="offline">Оффлайн</option>
        </select>
      </div>

      {isOffline && (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Филиал</label>
          <select
            value={branchId ?? ""}
            onChange={(e) => {
              setBranchId(e.target.value ? Number(e.target.value) : null);
              setSpecialistId(null);
              setSlotId(null);
            }}
            className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
          >
            <option value="">
              {branchesLoading ? "Загрузка…" : "Выберите филиал"}
            </option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name ?? `Филиал #${b.id}`}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Специалист</label>
        <select
          value={specialistId ?? ""}
          onChange={(e) => {
            setSpecialistId(e.target.value ? Number(e.target.value) : null);
            setSlotId(null);
          }}
          className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
          disabled={isOffline && !branchId}
        >
          <option value="">
            {isOffline && !branchId
              ? "Сначала выберите филиал"
              : "Выберите специалиста"}
          </option>
          {specialists.map((sp) => (
            <option key={sp.id} value={sp.id}>
              {[sp.name, sp.last_name].filter(Boolean).join(" ") ||
                `#${sp.id}`}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Слот</label>
        {!specialistId ? (
          <p className="text-sm text-gray-500">Сначала выберите специалиста</p>
        ) : slotsLoading ? (
          <div className="flex justify-center py-6">
            <Spinner />
          </div>
        ) : slots.length === 0 ? (
          <p className="text-sm text-gray-500">Нет свободных слотов</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[260px] overflow-auto">
            {slots.map((slot) => {
              const active = slotId === slot.id;

              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSlotId(slot.id)}
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
    </>
  );

  // ── Render ───────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-medium">Запись клиента</h1>
        <p className="text-sm text-gray-500 mt-1">{STEP_TITLES[step]}</p>
      </div>

      {/* PHONE */}
      {step === "phone" && (
        <Card className="bg-white shadow-sm">
          <CardHeader className="px-6 pt-5 pb-3 flex items-center gap-2">
            <Phone size={18} className="text-[#3cb96a]" />
            <span className="text-lg font-medium">Введите номер телефона клиента</span>
          </CardHeader>
          <CardBody className="px-6 pb-6 flex flex-col gap-4">
            <Input
              type="tel"
              inputMode="tel"
              placeholder="+996 700 000 000"
              value={phone}
              onValueChange={(v) => setPhone(normalizePhone(v))}
              size="lg"
              variant="bordered"
              classNames={{ inputWrapper: "bg-white" }}
            />
            <Button
              className="bg-[#2d2d2d] text-white rounded-full self-end px-6"
              endContent={<ArrowRight size={16} />}
              isLoading={lookupPending}
              onPress={handlePhoneSubmit}
            >
              Продолжить
            </Button>
          </CardBody>
        </Card>
      )}

      {/* REGISTER */}
      {step === "register" && (
        <Card className="bg-white shadow-sm">
          <CardHeader className="px-6 pt-5 pb-3 flex items-center gap-2">
            <UserPlus size={18} className="text-[#3cb96a]" />
            <div className="flex flex-col">
              <span className="text-lg font-medium">Данные нового клиента</span>
              <span className="text-xs text-gray-500">{phone}</span>
            </div>
          </CardHeader>
          <CardBody className="px-6 pb-6 flex flex-col gap-4">
            <Input
              label="ФИО"
              placeholder="Имя клиента"
              value={newUser.full_name}
              onValueChange={(v) => setNewUser((u) => ({ ...u, full_name: v }))}
              size="lg"
              variant="bordered"
              classNames={{ inputWrapper: "bg-white" }}
            />
            <Input
              label="Пароль (минимум 6 символов)"
              placeholder="••••••"
              type="password"
              value={newUser.password}
              onValueChange={(v) => setNewUser((u) => ({ ...u, password: v }))}
              size="lg"
              variant="bordered"
              classNames={{ inputWrapper: "bg-white" }}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Возраст"
                type="number"
                placeholder="7"
                value={newUser.age}
                onValueChange={(v) => setNewUser((u) => ({ ...u, age: v }))}
                size="lg"
                variant="bordered"
                classNames={{ inputWrapper: "bg-white" }}
              />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Пол</label>
                <select
                  value={newUser.gender}
                  onChange={(e) =>
                    setNewUser((u) => ({
                      ...u,
                      gender: e.target.value as "Male" | "Female",
                    }))
                  }
                  className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
                >
                  <option value="Male">Мужской</option>
                  <option value="Female">Женский</option>
                </select>
              </div>
            </div>
            <label className="inline-flex items-center gap-2 text-sm text-gray-700 select-none">
              <input
                type="checkbox"
                checked={newUser.is_child}
                onChange={(e) =>
                  setNewUser((u) => ({ ...u, is_child: e.target.checked }))
                }
                className="w-4 h-4"
              />
              Учётка ребёнка
            </label>
            <Button
              className="bg-[#2d2d2d] text-white rounded-full self-end px-6"
              endContent={<ArrowRight size={16} />}
              isLoading={register.isPending}
              onPress={handleRegister}
            >
              Создать клиента
            </Button>
          </CardBody>
        </Card>
      )}

      {/* EXISTING — balance + choice */}
      {step === "existing" && (
        <Card className="bg-white shadow-sm">
          <CardHeader className="px-6 pt-5 pb-3 flex items-center gap-2">
            <Wallet size={18} className="text-[#3cb96a]" />
            <div className="flex flex-col">
              <span className="text-lg font-medium">
                {foundStudent?.full_name || foundStudent?.username}
              </span>
              <span className="text-xs text-gray-500">
                {foundStudent?.phone_number || phone}
              </span>
            </div>
          </CardHeader>
          <CardBody className="px-6 pb-6 flex flex-col gap-5">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Баланс</h4>
              {balanceLoading ? (
                <div className="flex justify-center py-4">
                  <Spinner size="sm" />
                </div>
              ) : balance.length === 0 ? (
                <p className="text-sm text-gray-500">У клиента ещё нет тарифов</p>
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

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 bg-[#22bb79] text-white rounded-full"
                isDisabled={availableTariffs.length === 0}
                onPress={() => {
                  resetSelections();
                  if (availableTariffs.length === 1) {
                    setUserTariffId(availableTariffs[0].id);
                  }
                  setStep("balance_book");
                }}
              >
                Записать из текущего тарифа
              </Button>
              <Button
                className="flex-1 bg-[#2d2d2d] text-white rounded-full"
                onPress={() => {
                  resetSelections();
                  setStep("tariff");
                }}
              >
                Новый тариф
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* TARIFF + payment */}
      {step === "tariff" && (
        <Card className="bg-white shadow-sm">
          <CardHeader className="px-6 pt-5 pb-3 flex items-center gap-2">
            <Wallet size={18} className="text-[#3cb96a]" />
            <span className="text-lg font-medium">Выбор тарифа и оплата</span>
          </CardHeader>
          <CardBody className="px-6 pb-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Тариф</label>
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
                {tariffsArr.map((tr) => (
                  <option key={tr.id} value={tr.id}>
                    {tr.name} · {tr.lesson_count} зан. · {tr.price} сом
                  </option>
                ))}
              </select>
            </div>

            {renderBookingFormFields()}

            <div className="flex justify-end pt-2">
              <Button
                className="bg-[#2d2d2d] text-white rounded-full px-6"
                isDisabled={
                  !selectedTariff ||
                  !specialistId ||
                  !slotId ||
                  (isOffline && !branchId)
                }
                isLoading={createPayment.isPending || confirmPayment.isPending}
                onPress={handleConfirmTariff}
              >
                Оплатить и записать
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* BALANCE_BOOK */}
      {step === "balance_book" && (
        <Card className="bg-white shadow-sm">
          <CardHeader className="px-6 pt-5 pb-3 flex items-center gap-2">
            <Wallet size={18} className="text-[#3cb96a]" />
            <span className="text-lg font-medium">Запись из баланса</span>
          </CardHeader>
          <CardBody className="px-6 pb-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Списать с тарифа
              </label>
              <select
                value={userTariffId ?? ""}
                onChange={(e) =>
                  setUserTariffId(
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
                className="w-full h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm"
              >
                <option value="">Выберите тариф</option>
                {availableTariffs.map((ut) => (
                  <option key={ut.id} value={ut.id}>
                    {ut.tariff_name ?? `Тариф #${ut.tariff}`} (осталось{" "}
                    {ut.lessons_left})
                  </option>
                ))}
              </select>
            </div>

            {renderBookingFormFields()}

            <div className="flex justify-end pt-2">
              <Button
                className="bg-[#2d2d2d] text-white rounded-full px-6"
                isDisabled={
                  !userTariffId ||
                  !specialistId ||
                  !slotId ||
                  (isOffline && !branchId)
                }
                isLoading={createLesson.isPending}
                onPress={handleBookFromBalance}
              >
                Записать
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* DONE */}
      {step === "done" && result && (
        <Card className="bg-white shadow-sm">
          <CardBody className="px-6 py-8 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#e7f9f0] flex items-center justify-center">
              <CheckCircle2 size={36} className="text-[#22bb79]" />
            </div>
            <h2 className="text-xl font-medium">{result.message}</h2>
            <div className="text-sm text-gray-600 flex flex-col gap-1 items-center">
              {result.lessonName && <span>{result.lessonName}</span>}
              {(result.startTime || result.endTime) && (
                <span>{formatSlot(result.startTime ?? null, result.endTime ?? null)}</span>
              )}
              {result.branchName && <span>Филиал: {result.branchName}</span>}
              {result.meetLink && (
                <a
                  href={result.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0e6b3f] underline"
                >
                  Открыть Google Meet
                </a>
              )}
            </div>
            <Button
              className="bg-[#2d2d2d] text-white rounded-full px-6 mt-2"
              onPress={resetAll}
            >
              Записать ещё одного
            </Button>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
