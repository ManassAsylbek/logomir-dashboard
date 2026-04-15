import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { CustomRangeDatePicker } from "@/shared/ui/CustomRangeDatePicker";
import {
  TrendingUp,
  TrendingDown,
  CalendarDays,
  Users,
  DollarSign,
  BookOpen,
  ArrowRight,
  X,
  CreditCard,
  Banknote,
  BarChart2,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const CIRCUMFERENCE = 2 * Math.PI * 80;

interface DonutSegment {
  value: number;
  color: string;
  label: string;
}

const segments: DonutSegment[] = [
  { value: 49, color: "#4ade80", label: "Артикуляционные упражнения" },
  { value: 30, color: "#1f2937", label: "Ролевые игры" },
  { value: 21, color: "#9ca3af", label: "Звуковые постановки" },
];

const MONTHLY_DATA = [
  { month: "Янв", som: 72000, usd: 820, transactions: 14 },
  { month: "Фев", som: 85000, usd: 970, transactions: 18 },
  { month: "Мар", som: 91000, usd: 1040, transactions: 21 },
  { month: "Апр", som: 78000, usd: 890, transactions: 16 },
  { month: "Май", som: 95000, usd: 1085, transactions: 23 },
  { month: "Июн", som: 88000, usd: 1005, transactions: 19 },
  { month: "Июл", som: 102000, usd: 1164, transactions: 26 },
  { month: "Авг", som: 97000, usd: 1107, transactions: 22 },
  { month: "Сен", som: 110000, usd: 1256, transactions: 28 },
  { month: "Окт", som: 99000, usd: 1130, transactions: 24 },
  { month: "Ноя", som: 108000, usd: 1233, transactions: 27 },
  { month: "Дек", som: 58266, usd: 665, transactions: 13 },
];

const RECENT_TRANSACTIONS = [
  {
    id: "#TXN-001",
    student: "Алия Бекова",
    amount: 9500,
    usd: 108,
    status: "paid",
    date: "15 апр",
  },
  {
    id: "#TXN-002",
    student: "Дамир Сейткали",
    amount: 12000,
    usd: 137,
    status: "paid",
    date: "14 апр",
  },
  {
    id: "#TXN-003",
    student: "Жанар Омарова",
    amount: 9500,
    usd: 108,
    status: "pending",
    date: "13 апр",
  },
  {
    id: "#TXN-004",
    student: "Арман Жаксыбеков",
    amount: 15000,
    usd: 171,
    status: "paid",
    date: "12 апр",
  },
  {
    id: "#TXN-005",
    student: "Санем Нурланова",
    amount: 9500,
    usd: 108,
    status: "failed",
    date: "11 апр",
  },
  {
    id: "#TXN-006",
    student: "Нурсултан Касым",
    amount: 12000,
    usd: 137,
    status: "paid",
    date: "10 апр",
  },
];

function RevenueModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const maxSom = Math.max(...MONTHLY_DATA.map((d) => d.som));

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      size="4xl"
      scrollBehavior="inside"
      classNames={{
        base: "bg-white",
        header: "border-b border-gray-100",
        footer: "border-t border-gray-100",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center justify-between pr-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {t("dashboard.revenueModal.title")}
            </h2>
            <p className="text-sm text-gray-500 font-normal mt-0.5">
              {t("dashboard.revenueModal.subtitle")}
            </p>
          </div>
        </ModalHeader>
        <ModalBody className="p-6 flex flex-col gap-6">
          {/* Summary KPI row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: t("dashboard.revenueModal.totalSom"),
                value: "1 083 266",
                icon: <Banknote size={18} className="text-green-600" />,
                bg: "bg-green-50",
              },
              {
                label: t("dashboard.revenueModal.totalUsd"),
                value: "$12 389",
                icon: <DollarSign size={18} className="text-blue-600" />,
                bg: "bg-blue-50",
              },
              {
                label: t("dashboard.revenueModal.transactions"),
                value: "251",
                icon: <CreditCard size={18} className="text-purple-600" />,
                bg: "bg-purple-50",
              },
              {
                label: t("dashboard.revenueModal.avgPayment"),
                value: "4 315 с",
                icon: <BarChart2 size={18} className="text-amber-600" />,
                bg: "bg-amber-50",
              },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-2xl border border-gray-100 p-4 flex flex-col gap-2"
              >
                <div
                  className={`w-9 h-9 rounded-xl ${kpi.bg} flex items-center justify-center`}
                >
                  {kpi.icon}
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {kpi.value}
                </div>
                <div className="text-xs text-gray-500">{kpi.label}</div>
              </div>
            ))}
          </div>

          {/* Monthly bar chart */}
          <div className="rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800">
                {t("dashboard.revenueModal.monthlyChart")}
              </h3>
              <span className="text-xs text-gray-400">2026</span>
            </div>
            <div className="flex items-end gap-2 h-36">
              {MONTHLY_DATA.map((d, i) => (
                <div
                  key={d.month}
                  className="flex flex-col items-center gap-1 flex-1 group"
                >
                  <div className="relative w-full flex justify-center">
                    <div
                      className="w-full rounded-t-md transition-all group-hover:opacity-80"
                      style={{
                        height: `${(d.som / maxSom) * 130}px`,
                        background:
                          i === 11
                            ? "linear-gradient(to top, #16a34a, #4ade80)"
                            : i === MONTHLY_DATA.length - 2
                              ? "linear-gradient(to top, #2563eb, #60a5fa)"
                              : "linear-gradient(to top, #e5e7eb, #f3f4f6)",
                      }}
                    />
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-[10px] rounded px-1.5 py-0.5 whitespace-nowrap pointer-events-none transition-opacity">
                      {(d.som / 1000).toFixed(0)}k сом
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {MONTHLY_DATA.map((d) => (
                <div
                  key={d.month}
                  className="flex-1 text-center text-[10px] text-gray-400"
                >
                  {d.month}
                </div>
              ))}
            </div>
          </div>

          {/* Transactions table */}
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">
                {t("dashboard.revenueModal.recentTx")}
              </h3>
              <span className="text-xs text-gray-400">
                {RECENT_TRANSACTIONS.length} {t("dashboard.revenueModal.records")}
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {RECENT_TRANSACTIONS.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-300 to-green-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                      {tx.student[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">
                        {tx.student}
                      </div>
                      <div className="text-xs text-gray-400">
                        {tx.id} · {tx.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {tx.amount.toLocaleString()} сом
                      </div>
                      <div className="text-xs text-gray-400">${tx.usd}</div>
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                        tx.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : tx.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {tx.status === "paid" && <CheckCircle2 size={11} />}
                      {tx.status === "pending" && <Clock size={11} />}
                      {tx.status === "failed" && <XCircle size={11} />}
                      {tx.status === "paid"
                        ? t("dashboard.revenueModal.paid")
                        : tx.status === "pending"
                          ? t("dashboard.revenueModal.pending")
                          : t("dashboard.revenueModal.failed")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="light"
            className="rounded-xl text-gray-600"
            onPress={onClose}
            startContent={<X size={15} />}
          >
            {t("dashboard.revenueModal.close")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function DonutChart() {
  const { t } = useTranslation();
  let offset = 0;
  return (
    <div className="flex items-center gap-6">
      <div className="relative shrink-0">
        <svg width="160" height="160" viewBox="0 0 220 220">
          {segments.map((seg, i) => {
            const dash = (seg.value / 100) * CIRCUMFERENCE;
            const el = (
              <circle
                key={i}
                cx="110"
                cy="110"
                r="80"
                fill="none"
                stroke={seg.color}
                strokeWidth="38"
                strokeDasharray={`${dash} ${CIRCUMFERENCE}`}
                strokeDashoffset={-offset}
                transform="rotate(-90 110 110)"
                strokeLinecap="butt"
              />
            );
            offset += dash;
            return el;
          })}
          <circle cx="110" cy="110" r="61" fill="white" />
          <text
            x="110"
            y="105"
            textAnchor="middle"
            fontSize="28"
            fontWeight="700"
            fill="#1f2937"
          >
            76%
          </text>
          <text
            x="110"
            y="128"
            textAnchor="middle"
            fontSize="12"
            fill="#6b7280"
          >
            {t("dashboard.successRate")}
          </text>
        </svg>
      </div>
      <div className="flex flex-col gap-3 flex-1">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-xs text-gray-600 flex-1">{seg.label}</span>
            <span className="text-xs font-semibold text-gray-800">
              {seg.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MainPage() {
  const { t } = useTranslation();
  const [revenueOpen, setRevenueOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <RevenueModal open={revenueOpen} onClose={() => setRevenueOpen(false)} />
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("dashboard.title")}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {t("dashboard.subtitle")}
          </p>
        </div>
        <CustomRangeDatePicker />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm bg-gradient-to-br from-green-50 to-white">
          <CardBody className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <TrendingUp size={20} className="text-green-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp size={11} /> +4%
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">76%</div>
            <div className="text-xs text-gray-500">{t("dashboard.successRate")}</div>
          </CardBody>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-white">
          <CardBody className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <CalendarDays size={20} className="text-blue-600" />
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp size={11} /> +2
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">18</div>
            <div className="text-xs text-gray-500">{t("dashboard.upcomingLessons")}</div>
          </CardBody>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-purple-50 to-white">
          <CardBody className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Users size={20} className="text-purple-600" />
              </div>
              <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingDown size={11} /> -1
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">47</div>
            <div className="text-xs text-gray-500">{t("dashboard.activeStudents")}</div>
          </CardBody>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-amber-50 to-white">
          <CardBody className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <DollarSign size={20} className="text-amber-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp size={11} /> +12%
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">$12.4k</div>
            <div className="text-xs text-gray-500">{t("dashboard.revenue")}</div>
          </CardBody>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donut chart */}
        <Card className="border-none shadow-sm">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-gray-900">
                {t("dashboard.lessonTypes")}
              </h3>
              <BookOpen size={16} className="text-gray-400" />
            </div>
            <DonutChart />
          </CardBody>
        </Card>

        {/* Revenue card */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-[#1f2937] text-white">
          <CardBody className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold mb-1">
                  {t("dashboard.revenueCard")}
                </h3>
                <p className="text-gray-400 text-sm">
                  {t("dashboard.revenueSubtitle")}
                </p>
              </div>
              <Button
                size="sm"
                className="bg-white/10 text-white border border-white/20 rounded-full px-4 hover:bg-white/20"
                endContent={<ArrowRight size={14} />}
                onPress={() => setRevenueOpen(true)}
              >
                {t("dashboard.details")}
              </Button>
            </div>
            <div className="flex flex-col gap-1 mb-8">
              <div className="text-gray-400 text-sm">1 083 266 сом</div>
              <div className="text-5xl font-bold">$12 389</div>
            </div>
            <div className="flex items-end gap-1.5 h-16">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${h}%`,
                    backgroundColor:
                      i === 11 ? "#4ade80" : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Янв</span>
              <span>Дек</span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming lessons */}
        <Card className="border-none shadow-sm">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                {t("dashboard.upcomingList")}
              </h3>
              <Button
                size="sm"
                variant="light"
                className="text-gray-500 text-xs rounded-full"
                endContent={<ArrowRight size={12} />}
              >
                {t("dashboard.all")}
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                {
                  name: "Алия Бекова",
                  time: "10:00",
                  typeKey: "online",
                  color: "bg-green-100 text-green-700",
                },
                {
                  name: "Дамир Сейткали",
                  time: "12:30",
                  typeKey: "offline",
                  color: "bg-gray-100 text-gray-700",
                },
                {
                  name: "Жанар Омарова",
                  time: "15:00",
                  typeKey: "online",
                  color: "bg-green-100 text-green-700",
                },
              ].map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-300 to-green-500 flex items-center justify-center text-white text-sm font-semibold">
                      {s.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">
                        {s.name}
                      </div>
                      <div className="text-xs text-gray-500">{s.time}</div>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.color}`}
                  >
                    {t(`dashboard.${s.typeKey}`)}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Weekly activity */}
        <Card className="border-none shadow-sm">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                {t("dashboard.weeklyActivity")}
              </h3>
            </div>
            <div className="flex items-end justify-between gap-2 h-32 mb-3">
              {[
                { day: "Пн", v: 60 },
                { day: "Вт", v: 85 },
                { day: "Ср", v: 45 },
                { day: "Чт", v: 90 },
                { day: "Пт", v: 70 },
                { day: "Сб", v: 30 },
                { day: "Вс", v: 20 },
              ].map((d) => (
                <div
                  key={d.day}
                  className="flex flex-col items-center gap-1.5 flex-1"
                >
                  <div
                    className="w-full rounded-t-lg"
                    style={{
                      height: `${d.v}%`,
                      background:
                        d.v === 90
                          ? "linear-gradient(to top, #16a34a, #4ade80)"
                          : "linear-gradient(to top, #e5e7eb, #f3f4f6)",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => (
                <div
                  key={d}
                  className="flex-1 text-center text-xs text-gray-400"
                >
                  {d}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
