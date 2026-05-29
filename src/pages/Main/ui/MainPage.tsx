import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
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

import { useDashboardAnalytics } from "@/shared/services/analytics/useDashboardAnalytics";
import { usePaymentsAnalytics } from "@/shared/services/analytics/usePaymentsAnalytics";
import type {
  LessonTypeShare,
  PaymentsAnalytics,
} from "@/shared/api/analytics/types";
import {
  formatRu,
  monthLabel,
  weekdayLabel,
  formatTime,
  deltaText,
  isPositiveDelta,
} from "@/pages/Main/lib/format";

const CIRCUMFERENCE = 2 * Math.PI * 80;

const DONUT_COLORS = ["#4ade80", "#1f2937", "#9ca3af", "#60a5fa", "#f59e0b"];

function DeltaBadge({ delta, percent }: { delta: number; percent?: boolean }) {
  const positive = isPositiveDelta(delta);

  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
        positive ? "text-green-600 bg-green-100" : "text-red-500 bg-red-50"
      }`}
    >
      {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}{" "}
      {deltaText(delta, percent)}
    </span>
  );
}

function RevenueModal({
  open,
  onClose,
  payments,
}: {
  open: boolean;
  onClose: () => void;
  payments?: PaymentsAnalytics;
}) {
  const { t } = useTranslation();
  const monthly = payments?.monthly ?? [];
  const totals = payments?.totals;
  const transactions = payments?.recent_transactions ?? [];
  const maxSom = Math.max(...monthly.map((d) => d.som), 1);

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
                value: formatRu(totals?.total_som ?? 0),
                icon: <Banknote size={18} className="text-green-600" />,
                bg: "bg-green-50",
              },
              {
                label: t("dashboard.revenueModal.totalUsd"),
                value: `$${formatRu(totals?.total_usd ?? 0)}`,
                icon: <DollarSign size={18} className="text-blue-600" />,
                bg: "bg-blue-50",
              },
              {
                label: t("dashboard.revenueModal.transactions"),
                value: formatRu(totals?.transactions_count ?? 0),
                icon: <CreditCard size={18} className="text-purple-600" />,
                bg: "bg-purple-50",
              },
              {
                label: t("dashboard.revenueModal.avgPayment"),
                value: `${formatRu(totals?.avg_payment_som ?? 0)} с`,
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
            </div>
            <div className="flex items-end gap-2 h-36">
              {monthly.map((d, i) => (
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
                          i === monthly.length - 1
                            ? "linear-gradient(to top, #16a34a, #4ade80)"
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
              {monthly.map((d) => (
                <div
                  key={d.month}
                  className="flex-1 text-center text-[10px] text-gray-400"
                >
                  {monthLabel(d.month)}
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
                {transactions.length} {t("dashboard.revenueModal.records")}
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-300 to-green-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                      {(tx.student_name ?? "?")[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">
                        {tx.student_name ?? "—"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {tx.id} · {tx.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatRu(tx.amount_som)} сом
                      </div>
                      <div className="text-xs text-gray-400">
                        ${tx.amount_usd}
                      </div>
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

function DonutChart({
  segments,
  successRate,
}: {
  segments: LessonTypeShare[];
  successRate: number;
}) {
  const { t } = useTranslation();
  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative shrink-0">
        <svg width="160" height="160" viewBox="0 0 220 220">
          {segments.map((seg, i) => {
            const dash = (seg.percent / 100) * CIRCUMFERENCE;
            const el = (
              <circle
                key={seg.label}
                cx="110"
                cy="110"
                r="80"
                fill="none"
                stroke={DONUT_COLORS[i % DONUT_COLORS.length]}
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
            {successRate}%
          </text>
          <text x="110" y="128" textAnchor="middle" fontSize="12" fill="#6b7280">
            {t("dashboard.successRate")}
          </text>
        </svg>
      </div>
      <div className="flex flex-col gap-3 flex-1">
        {segments.map((seg, i) => (
          <div key={seg.label} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: DONUT_COLORS[i % DONUT_COLORS.length] }}
            />
            <span className="text-xs text-gray-600 flex-1">{seg.label}</span>
            <span className="text-xs font-semibold text-gray-800">
              {seg.percent}%
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
  const [searchParams] = useSearchParams();

  const params = {
    date_from: searchParams.get("start_date") ?? undefined,
    date_to: searchParams.get("end_date") ?? undefined,
  };

  const { data: dashboard, isLoading: dashboardLoading } =
    useDashboardAnalytics(params);
  const { data: payments, isLoading: paymentsLoading } =
    usePaymentsAnalytics(params);

  const kpi = dashboard?.kpi;
  const lessonTypes = dashboard?.lesson_types ?? [];
  const upcoming = dashboard?.upcoming_lessons ?? [];
  const weekly = dashboard?.weekly_activity ?? [];
  const maxWeekly = Math.max(...weekly.map((d) => d.lessons_count), 1);

  const monthly = payments?.monthly ?? [];
  const maxMonthlySom = Math.max(...monthly.map((d) => d.som), 1);

  const isInitialLoading = dashboardLoading || paymentsLoading;

  return (
    <div className="flex flex-col gap-6">
      <RevenueModal
        open={revenueOpen}
        onClose={() => setRevenueOpen(false)}
        payments={payments}
      />
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("dashboard.title")}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {t("dashboard.subtitle")}
          </p>
        </div>
        <CustomRangeDatePicker />
      </div>

      {isInitialLoading ? (
        <div className="flex justify-center py-32">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-none shadow-sm bg-gradient-to-br from-green-50 to-white">
              <CardBody className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <TrendingUp size={20} className="text-green-600" />
                  </div>
                  <DeltaBadge delta={kpi?.success_rate.delta ?? 0} percent />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {kpi?.success_rate.value ?? 0}%
                </div>
                <div className="text-xs text-gray-500">
                  {t("dashboard.successRate")}
                </div>
              </CardBody>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-white">
              <CardBody className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <CalendarDays size={20} className="text-blue-600" />
                  </div>
                  <DeltaBadge delta={kpi?.upcoming_lessons.delta ?? 0} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {kpi?.upcoming_lessons.value ?? 0}
                </div>
                <div className="text-xs text-gray-500">
                  {t("dashboard.upcomingLessons")}
                </div>
              </CardBody>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-purple-50 to-white">
              <CardBody className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Users size={20} className="text-purple-600" />
                  </div>
                  <DeltaBadge delta={kpi?.active_students.delta ?? 0} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {kpi?.active_students.value ?? 0}
                </div>
                <div className="text-xs text-gray-500">
                  {t("dashboard.activeStudents")}
                </div>
              </CardBody>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-amber-50 to-white">
              <CardBody className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <DollarSign size={20} className="text-amber-600" />
                  </div>
                  <DeltaBadge delta={kpi?.revenue_usd.delta ?? 0} percent />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  ${((kpi?.revenue_usd.value ?? 0) / 1000).toFixed(1)}k
                </div>
                <div className="text-xs text-gray-500">
                  {t("dashboard.revenue")}
                </div>
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
                <DonutChart
                  segments={lessonTypes}
                  successRate={kpi?.success_rate.value ?? 0}
                />
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
                  <div className="text-gray-400 text-sm">
                    {formatRu(payments?.totals.total_som ?? 0)} сом
                  </div>
                  <div className="text-5xl font-bold">
                    ${formatRu(payments?.totals.total_usd ?? 0)}
                  </div>
                </div>
                <div className="flex items-end gap-1.5 h-16">
                  {monthly.map((d, i) => (
                    <div
                      key={d.month}
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${Math.max((d.som / maxMonthlySom) * 100, 4)}%`,
                        backgroundColor:
                          i === monthly.length - 1
                            ? "#4ade80"
                            : "rgba(255,255,255,0.15)",
                      }}
                    />
                  ))}
                </div>
                {monthly.length > 0 && (
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{monthLabel(monthly[0].month)}</span>
                    <span>{monthLabel(monthly[monthly.length - 1].month)}</span>
                  </div>
                )}
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
                  {upcoming.length === 0 && (
                    <p className="text-sm text-gray-400 py-4 text-center">
                      {t("dashboard.notFound")}
                    </p>
                  )}
                  {upcoming.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-300 to-green-500 flex items-center justify-center text-white text-sm font-semibold">
                          {(lesson.student_name ?? "?")[0]}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800">
                            {lesson.student_name ?? "—"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatTime(lesson.start_time)}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          lesson.lesson_type === "online"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {lesson.lesson_type
                          ? t(`dashboard.${lesson.lesson_type}`)
                          : ""}
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
                  {weekly.map((d) => (
                    <div
                      key={d.day}
                      className="flex flex-col items-center gap-1.5 flex-1"
                    >
                      <div
                        className="w-full rounded-t-lg"
                        style={{
                          height: `${Math.max((d.lessons_count / maxWeekly) * 100, 4)}%`,
                          background:
                            d.lessons_count === maxWeekly && maxWeekly > 0
                              ? "linear-gradient(to top, #16a34a, #4ade80)"
                              : "linear-gradient(to top, #e5e7eb, #f3f4f6)",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  {weekly.map((d) => (
                    <div
                      key={d.day}
                      className="flex-1 text-center text-xs text-gray-400"
                    >
                      {weekdayLabel(d.day)}
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
