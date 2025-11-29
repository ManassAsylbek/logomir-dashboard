import {
  getRouteMain,
  getRouteStudents,
  getRouteScheduledLessons,
  getRoutePaymentRequests,
  getRouteTherapists,
  getRouteNews,
  getRoutePresentations,
  getRouteGames,
} from "@/shared/const/router";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  DollarSign,
  Stethoscope,
  Newspaper,
  Presentation,
  Gamepad2,
} from "lucide-react";

export const links = [
  {
    id: 1,
    label: "Главная",
    icon: <LayoutDashboard strokeWidth={1} />,
    href: getRouteMain(),
  },

  {
    id: 3,
    label: "Ученики",
    icon: <Users strokeWidth={1} />,
    href: getRouteStudents(),
  },
  {
    id: 4,
    label: "Запланированные занятия",
    icon: <CalendarDays strokeWidth={1} />,
    href: getRouteScheduledLessons(),
  },
  {
    id: 5,
    label: "Заявки на оплату",
    icon: <DollarSign strokeWidth={1} />,
    href: getRoutePaymentRequests(),
  },
  {
    id: 6,
    label: "Логопеды",
    icon: <Stethoscope strokeWidth={1} />,
    href: getRouteTherapists(),
  },
  {
    id: 7,
    label: "Новости",
    icon: <Newspaper strokeWidth={1} />,
    href: getRouteNews(),
  },
  {
    id: 8,
    label: "Презентации",
    icon: <Presentation strokeWidth={1} />,
    href: getRoutePresentations(),
  },
  {
    id: 9,
    label: "Игры",
    icon: <Gamepad2 strokeWidth={1} />,
    href: getRouteGames(),
  },
];
